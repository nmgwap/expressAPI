/**
 * user表操作 
 */
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