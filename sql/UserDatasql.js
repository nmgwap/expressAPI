/**
 * userdata表操作 
 */
var UserData = {
    // 根据用户查数据
    queryUserData: function(param) {
        return "select USERNAME as userName,TITLE as title,CONTENT as content,EDITTIME as editTime  from user_data where USERNAME = '" + param.user + "'";
    },
    // 删除ID对应的数据
    deleteData: function(param) {
        return "DELETE from user_data where ID = " + param.ID;
    },
    // 增加数据
    insertData: function(param) {
        return "INSERT INTO user_data (USERNAME,TITLE,CONTENT,ADDTIME,EDITTIME) VALUES ('" + param.user + "','" + param.title + "','" + param.content + "','" + param.addtime + "','" + param.edittime + "')";
    }

}
exports = module.exports = UserData;