# shuqu-cli

## 下载安装

```ssh
npm install shuqu-cli -g
```

## 查看帮助

```ssh
shuqu -h
```

## 命令

### 初始化项目 `shuqu init`

1. 输入项目名称(默认shuqu-project)
2. 选择项目模板
3. 输入项目描述(默认数趣云前端项目)
4. 作者名称(默认shuquyun)
5. 是否根据数据库生成项目代码(Yes or No); 

> No: 直接生成初识项目模板

> Yes: 请先在当前目录新建 `db.config.json` 文件并配置,目前只支持生成普通模板


### 添加路由文件 `shuqu add`
    
1. 请输入路由名称
2. 请选择路由模板

> 普通模板目前是函数组件形式,高级模板目前为Class组件形式


### db.config.json 

根据数据库生成项目代码配置文件, **(项目生成后请务必删除该文件)**

```json
{
    "host": "127.0.0.1",
    "user": "root",
    "password": "xxxx",
    "port": "3306",
    "database": "xxxx",
    "multipleStatements": true
}
```
