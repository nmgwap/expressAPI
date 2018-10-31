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