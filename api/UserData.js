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
var userData = require('../sql/UserDatasql');
// 导入自定义公共类
var util = require('../utils/util');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbconfig.mysql);

/* POST users listing. */
/* 获取用户数据列表 */
router.post('/list', function(req, res, next) {
    // 获取请求字段
    let params = {
        user: req.body.user
    };
    // 启用连接池查询
    pool.getConnection(function(err, connection) {
        // 查询用户名是否存在
        connection.query(userData.queryUserData(params), function(err, results) {
            // 查询结果
            if (!util.isEmpty(results)) {
                res.send({ "success": true, "data": results, "msg": "" });
                connection.release();
            } else {
                res.send({ "success": false, "data": {}, "msg": "" });
            }
        });
    })
});
/* 用户插入数据 */
router.post('/add', function(req, res, next) {
    console.log(req.body)
    let params = req.body;
    // 启用连接池查询
    pool.getConnection(function(err, connection) {
        // 插入数据
        connection.query(userData.insertData(params), function(err, results) {
            // 查询结果
            if (!util.isEmpty(results)) {
                res.send({ "success": true, "data": results, "msg": "数据插入成功" });
                connection.release();
            } else {
                res.send({ "success": false, "data": {}, "msg": "数据插入失败" });
            }
        });
    })
});
module.exports = router;