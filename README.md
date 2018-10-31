# nodejs-express-mysql后端接口

#### 说明

>  本项目主要用于熟悉如何用 node写后端接口（post方式）

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

>  开发环境 w7  Chrome 61

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

#### 功能

- [x] 登录接口 -- 完成
- [x] 注册接口 -- 完成
- [x] 获取列表 -- 完成
- [x] 添加数据 -- 完成


#### 目录结构说明
------------------------

```
├── /api/               # 存放接口文件。
├── /bin/               # 存放启动项目的脚本文件，默认www。
├── /db/                # 数据库配置信息。
├── /routes/            # 路由文件相当于MVC中的Controller。
├── /public/            # 页面文件css,js,img。
├── /sql/               # sql查询语句。
├── /utils/             # 公共方法。
├── package.json        # 项目依赖配置及开发者信息。
├── app.js              # 应用核心配置文件，项目入口，程序从这里开始。
```

#### 前期准备
------------------------
> 1. 本机安装node环境
> 2. 本机安装mysql
> 3. 建user表 user_data表，或者修改项目数据库连接

#### 修改数据库连接信息地址
------------------------
```
以下信息根据自己情况修改

module.exports = {
    mysql: {
        host: 'localhost', // 主机名
        user: 'root', // 用户名
        password: '123456', // 密码
        database: 'notes', // 数据库名 
        port: 3306 // 端口号（默认都是3306）
    }
};

```

#### 表操作
------------------------
```
var User = {
    // 查询用户名
    queryUserName: function(param) {
        return "select * from user where USERNAME = '" + param.user + "'";
    },
    // 验证用户名密码
    queryUNP: function(param) {
        return "select * from user where USERNAME = '" + param.user + "' and PASSWORD = '" + param.pwd + "' limit 1";
    },
    // 增加数据
    insertData: function(param) {
        return "INSERT INTO user (USERNAME,PASSWORD,HEADPORTRAIT,ADDTIME,EDITTIME) VALUES ('" + param.user + "','" + param.pwd + "','" + param.headimg + "','" + param.addtime + "','" + param.edittime + "')";
    }

}
exports = module.exports = User;

```

#### 登录和注册接口
------------------------
```
// 导入express模块
var express = require('express');
// 导入路由模块
var router = express.Router();
// 导入url模块
var url = require('url');
// 导入mysql模块 
var mysql = require('mysql');
// 导入数据库配置信息
var dbconfig = require('../db/DBConfig');
// 导入SQL查询语句
var user = require('../sql/Usersql');
// 导入自定义公共类
var util = require('../utils/util');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbconfig.mysql);

/* POST users listing. */
/* 登录接口 */
router.post('/login', function(req, res, next) {
    // 获取请求字段
    let params = {
        user: req.body.user,
        pwd: req.body.pwd
    };
    // 启用连接池查询
    pool.getConnection(function(err, connection) {
        // 查询用户名是否存在
        connection.query(user.queryUserName(params), function(err, results) {
            // 查询结果
            console.log(results)
            if (!util.isEmpty(results)) {
                // 查询用户名密码是否正确
                connection.query(user.queryUNP(params), function(err, result) {
                    if (util.isEmpty(result)) {
                        res.send({ "success": false, "data": {}, "msg": "用户名或密码错误" });
                    } else {
                        if (result.length == 1) {
                            res.send({ "success": true, "data": {}, "msg": "登录成功" });
                        } else {
                            res.send({ "success": false, "data": {}, "msg": "用户名或密码错误" });
                        }
                    }
                });
                connection.release();
            } else {
                res.send({ "success": false, "data": {}, "msg": "用户名不存在" });
            }
        });
    })
});
/* 注册用户 */
router.post('/registered', function(req, res, next) {
    // 获取请求字段
    let params = {
        user: req.body.user,
        pwd: req.body.pwd,
        headimg: req.body.headimg || '',
        addtime: util.CurentTime(),
        edittime: util.CurentTime()
    };
    // 启用连接池查询
    pool.getConnection(function(err, connection) {
        // 查询用户名是否存在
        connection.query(user.queryUserName(params), function(err, results) {
            if (util.isEmpty(results)) {
                // 插入用户名密码
                connection.query(user.insertData(params), function(err, result) {
                    if (!util.isEmpty(result)) {
                        res.send({ "success": true, "data": {}, "msg": "注册成功" });
                    } else {
                        res.send({ "success": false, "data": {}, "msg": "参数输入不合法" });
                    }
                });
                connection.release();
            } else {
                res.send({ "success": false, "data": {}, "msg": "用户名已经存在" });
            }
        });
    });
});

module.exports = router;

```

#### 运行项目
------------------------
``` 
    clone 
    git clone 
    
    安装依赖
	npm install

    运行
    npm start

```

