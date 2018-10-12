/*
 * @Author: 满楼 
 * @Date: 2018-09-28 11:25:01 
 * @Last Modified by: 满楼
 * @Last Modified time: 2018-10-12 10:48:11
 * 添加路由文件
 */

const { prompt } = require('inquirer')
const program = require('commander')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
const fs = require('fs')
const path = require('path')
const model = require('../model/pool')

const option = program.parse(process.argv).args[0]
const cwdPath = `${process.cwd()}/src/pages/`; //当前命令行执行程序所在路径
const defaultName = typeof option === 'string' ? option : 'router'
const tplList = require(`${__dirname}/templates`)
const tplLists = Object.keys(tplList) || [];
const directory = require('../directory/index.json')
const directorys = Object.keys(directory) || []

const utils = require('../model/utils')


const question = [
    {
        type: 'input',
        name: 'name',
        message: '请输入路由名称',
        default: defaultName,
        filter(val) {
            return val.trim()
        },
        validate(val) {
            const validate = (val.trim().split(" ")).length === 1
            return validate || '路由名称不许有空格';
        },
        transformer(val) {
            return val;
        }
    },
    {
        type: 'list',
        name: 'template',
        message: '选择组件类型',
        choices: directorys,
        default: directorys[0],
        validate(val) {
            return true;
        },
        transformer(val) {
            return val;
        }
    },
]

module.exports = prompt(question).then(({ name, template }) => {

    async function createRouter(params) {
        try {
            await exists(); //检测文件夹
            // await readFile(); //读取模板组件
            // await writeFile(await readFile()); //写入组件
        } catch (err) {
            chalk.red(err)
        }
    }

    // 检测文件目录是否存在  存在就报错  不存在就新建
    async function exists() {
        return new Promise((res) => {
            (async function () {
                const isPath = fs.existsSync(`${cwdPath}/${name}`)
                if (isPath) {
                    console.log(chalk.red('已存在改名称的文件目录,请检查文件名是否正确'))
                } else {
                    await createDirectory(); //创建路由目录主文件夹
                }
            })()
        })
    }

    // 创建目录主文件夹
    async function createDirectory() {
        return new Promise((res) => {
            (async function () {
                try {
                    fs.mkdirSync(`${cwdPath}/${name}`)
                    await createComponent();
                    //创建components文件夹
                } catch (err) {
                    console.log(chalk.red(err))
                }
            })()
        })
    }

    // 创建 componests 文件夹
    async function createComponent() {
        return new Promise((res) => {
            (async function () {
                try {
                    fs.mkdirSync(`${cwdPath}/${name}/components`)
                    await createFile()
                    console.log(chalk.green('创建完成'))
                } catch (err) {
                    console.log(chalk.red(err))
                }
            })()
        })
    }

    async function createFile(params) {
        const directoryArr = directory[template];
        const routerName = name

        directoryArr.map((i, v) => {
            let path = `${cwdPath}${routerName}/${i}`

            fs.readFile(`${__dirname}/../template/${template}/${i}`, 'utf-8', function (err, data) {
                let result = data.replace(/manlou/g, routerName);
                let bigRouter = utils.toBig(routerName)
                let newResult = result.replace(/ManLou/g, bigRouter)
                fs.writeFile(path, newResult, 'utf-8', function (err) {
                    if (err) return console.log(chalk.red(err))
                })
            })

        })

    }

    createRouter()

})



