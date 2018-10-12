const mysql = require('mysql')
const fs = require('fs')



let Q;

async function lianjie(params) {
    try {
        const cwdpath = `${process.cwd()}/db.config.json`
        const data = fs.readFileSync(cwdpath, 'utf-8')
        const dbconfig = JSON.parse(data)
        const pool = mysql.createPool(dbconfig)
        Q = function (sql, values) {
            return new Promise((resolve, reject) => {
                pool.getConnection((err, conn) => {
                    if (err) {
                        console.log('数据库执行错误')
                        console.log(err)
                    }
                    if (err) return reject(err)
                    conn.query(sql, values, (err, rows) => {
                        if (err) reject(err)
                        else resolve(rows)
                        conn.release()
                    })
                })
            })
        }
    } catch (error) {
        console.log(error)
        console.log('数据库连接失败')
    }
}






async function switchTable(database) {
    return await Q(`
        select table_name from information_schema.tables where table_schema='${database}' and table_type='base table';
    `)
}

/**
 * 
 * @param {获取表中所有的字段} table 
 * @param {*} database 
 */
async function queryTable(table) {
    return await Q(
        // `select COLUMN_NAME from information_schema.COLUMNS where table_name = '${table}' and table_schema = '${database}';`
        `show full columns from ${table};`
    )
}



module.exports = {
    switchTable,
    queryTable,
    lianjie
}
