/*
 * @Author: 满楼 
 * @Date: 2018-09-28 11:25:22 
 * @Last Modified by: 满楼
 * @Last Modified time: 2018-10-15 15:52:27
 * 初始化项目脚本
 */

const { prompt } = require('inquirer')
const program = require('commander')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
const fs = require('fs')
const path = require('path')
const model = require('../model/pool')
const utils = require('../model/utils')


const option = program.parse(process.argv).args[0]
const defaultName = typeof option === 'string' ? option : 'shuqu-project'
const tplList = require(`${__dirname}/templates`)
const tplLists = Object.keys(tplList) || [];
const directory = require('../directory/index.json')

const question = [
    {
        type: 'input',
        name: 'name',
        message: '项目名称',
        default: defaultName,
        filter(val) {
            return val.trim()
        },
        validate(val) {
            const validate = (val.trim().split(" ")).length === 1
            return validate || '项目名称不许有空格 ';
        },
        transformer(val) {
            return val;
        }
    }, {
        type: 'list',
        name: 'template',
        message: '选择项目模板',
        choices: tplLists,
        default: tplLists[0],
        validate(val) {
            return true;
        },
        transformer(val) {
            return val;
        }
    }, {
        type: 'input',
        name: 'description',
        message: '项目描述',
        default: '数趣云前端项目',
        validate(val) {
            return true;
        },
        transformer(val) {
            return val;
        }
    }, {
        type: 'input',
        name: 'author',
        message: '作者名称',
        default: 'shuquyun',
        validate(val) {
            return true;
        },
        transformer(val) {
            return val;
        }
    }, {
        type: 'list',
        name: 'isdb',
        message: '是否根据数据库生成项目代码(请确保根目录存在db.config文件)',
        choices: ['Yes', 'No'],
        default: 'Yes',
        validate(val) {
            return true;
        },
        transformer(val) {
            return val;
        }
    }
]
module.exports = prompt(question).then(({ name, template, description, author, isdb }) => {
    const projectName = name;  //项目生成后的文件名
    const templateName = template;
    const gitPlace = tplList[templateName]['place'];
    const gitBranch = tplList[templateName]['branch'];
    const spinner = ora(`开始生成模板,请稍等...
    `);
    spinner.start();

    /**
     * 不根据数据库生成代码
     * @param {*} params 
     */
    async function noDbInt(params) {
        download(`${gitPlace}${gitBranch}`, `./${projectName}`, (err) => {
            if (err) {
                console.log(chalk.red(err))
                process.exit()
            }
            fs.readFile(`./${projectName}/package.json`, 'utf8', function (err, data) {
                if (err) {
                    spinner.stop();
                    console.error(err);
                    return;
                }
                const packageJson = JSON.parse(data);
                packageJson.name = name;
                packageJson.description = description;
                packageJson.author = author;
                var updatePackageJson = JSON.stringify(packageJson, null, 2);
                fs.writeFile(`./${projectName}/package.json`, updatePackageJson, 'utf8', function (err) {
                    if (err) {
                        spinner.stop();
                        console.error(err);
                        return;
                    } else {
                        spinner.stop();
                        console.log(chalk.green('项目初始化完成!'))
                        console.log(`
                            ${chalk.bgWhite.black('   启动程序命令:  ')}
                            ${chalk.green(`cd ${name}`)}
                            ${chalk.green('npm install')}
                            ${chalk.green('npm run start')}
                        `);
                    }
                });
            });
        })
    }

    /**
     *根据数据库生成代码
     *
     * @param {*} params
     */
    async function dbInt(params) {

        // 打开数据库连接
        model.lianjie()

        fs.readFile(`${process.cwd()}/db.config.json`, 'utf8', async function (err, data) {
            if (err) {
                spinner.stop()
                console.log(chalk.red(err))
            } else {
                const dbData = JSON.parse(data)
                const table = await queryTable(dbData)

                await readTmp(table)
            }
        })


    }

    //下载模板 并且新建项目
    async function readTmp(table) {
        download(`${gitPlace}${gitBranch}`, `./${projectName}`, async (err) => {
            spinner.stop()

            if (err) {
                console.log(chalk.red(err))
                process.exit()
            }
            const data = fs.readFileSync(`./${projectName}/package.json`, 'utf8');

            const packageJson = JSON.parse(data);
            packageJson.name = name;
            packageJson.description = description;
            packageJson.author = author;
            var updatePackageJson = JSON.stringify(packageJson, null, 2);

            fs.writeFileSync(`./${projectName}/package.json`, updatePackageJson, 'utf8');

            await (async function () {
                for (let i of table) {
                    let file = utils.hyphenToHump(i)
                    // 检查文件夹是否存在
                    const isatch = fs.existsSync(`${process.cwd()}/${projectName}/src/pages/${file}`);
                    if (isatch) {
                        console.log(chalk.red(`已存在${file}文件目录,请检查文件名是否正确或者手动创建`))
                    } else {
                        await createDirectory(file)
                    }
                }
            })()
            console.log(chalk.green('项目初始化完成!'))
            console.log(`
                ${chalk.bgWhite.black('   启动程序命令:  ')}
                ${chalk.green(`cd ${name}`)}
                ${chalk.yellow('npm install')}
                ${chalk.green('npm run start')}
            `);
            process.exit()
        })
    }


    // 查看数据库表名
    async function queryTable(params) {
        const table = await model.switchTable(params.database)
        let tableName = []
        table.map((i, v) => {
            tableName.push(i.table_name)
        })
        return tableName
    }



    // 创建目录主文件夹
    async function createDirectory(file) {
        fs.mkdirSync(`${process.cwd()}/${projectName}/src/pages/${file}`)
        await createComponent(file); //创建components文件夹
    }

    // 创建 componests 文件夹
    async function createComponent(file) {
        fs.mkdirSync(`${process.cwd()}/${projectName}/src/pages/${file}/components`)
        await createFile(file)

    }

    async function createFile(file) {
        // TODO 根据用户选择的项目模板 去选择不同的代码模板
        const directoryArr = directory['普通模板'];
        const routerName = file
        let t = utils.humpToHyphen(file)
        //* 查询数据库
        let Field = await model.queryTable(t)

        directoryArr.map((i, v) => {
            (async () => {
                let path = `${process.cwd()}/${projectName}/src/pages/${routerName}/${i}`

                // list文件需要去查询数据库字段 拼接好之后写入文件
                if (i === "components/List.js") {

                    let arr = []

                    Field.map((item, index) => {
                        if (item.Field == 'id' || item.Field == 'uid' || item.Field == '创建时间') {
                            return
                        } else {
                            let str = `
        {
            title: '${item.Comment}',
            dataIndex: '${utils.hyphenToHump(item.Field)}',
            key: '${utils.hyphenToHump(item.Field)}',
        }`;
                            arr.push(str)
                        }
                    })
                    const data = fs.readFileSync(`${__dirname}/../fileTemplate/List.js`, 'utf-8')
                    let temple = arr.join(',')
                    let result = data.replace(/'@List'/g, temple);
                    fs.writeFileSync(path, result, 'utf-8')
                    console.log(chalk.green(path))
                } else {
                    const datas = fs.readFileSync(`${__dirname}/../template/普通模板/${i}`, 'utf-8')
                    let result = datas.replace(/manlou/g, routerName);
                    let bigRouter = utils.toBig(routerName)
                    let newResult = result.replace(/ManLou/g, bigRouter)
                    fs.writeFileSync(path, newResult, 'utf-8')
                    console.log(chalk.green(path))
                }
            })()

        })
    }







    if (isdb === 'No') {
        noDbInt()
    } else {
        dbInt()
    }

})
