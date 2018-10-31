/**
 * util类
 */
var util = {
    /**
     * 时间格式化
     * @param：data
     * @returns yyyy-mm-dd
     */
    CurentTime: function(param) {
        var now = new Date();
        var year = now.getFullYear(); //年
        var month = now.getMonth() + 1; //月
        var day = now.getDate(); //日
        var hh = now.getHours(); //时
        var mm = now.getMinutes(); //分
        var clock = year + "-";
        if (month < 10)
            clock += "0";
        clock += month + "-";
        if (day < 10)
            clock += "0";
        clock += day + " ";
        if (hh < 10)
            clock += "0";
        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm;
        return (clock);
    },
    /**
     * 判断是否为空
     * @param：data
     * @returns {boolean}
     */
    isEmpty: function(data) {
        if (data == {} || data == "{}" || data == "[]" || data == [] || data == "" || data == " " || data == null || data == "null" || data == "undefined" || data == undefined) {
            return true;
        };
        return false;
    },
    /**
     * 判断是否为正整数
     * @param：data
     * @returns {boolean}
     */
    isPInt: function(data) {
        var g = /^[1-9]*[1-9][0-9]*$/;
        return g.test(data);
    },
    /**
     * 判断是否为整数
     * @param：data
     * @returns {boolean}
     */
    isInt: function(data) {
        var g = /^-?\d+$/;
        return g.test(data);
    },
    /**
     * 判断不能有表情符号
     * @param：substring
     * @returns {boolean}
     */
    isEmojiCharacter: function(substring) {
        for (var i = 0; i < substring.length; i++) {
            var hs = substring.charCodeAt(i);
            if (0xd800 <= hs && hs <= 0xdbff) {
                if (substring.length > 1) {
                    var ls = substring.charCodeAt(i + 1);
                    var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                    if (0x1d000 <= uc && uc <= 0x1f77f) {
                        return true;
                    }
                }
            } else if (substring.length > 1) {
                var ls = substring.charCodeAt(i + 1);
                if (ls == 0x20e3) {
                    return true;
                }
            } else {
                if (0x2100 <= hs && hs <= 0x27ff) {
                    return true;
                } else if (0x2B05 <= hs && hs <= 0x2b07) {
                    return true;
                } else if (0x2934 <= hs && hs <= 0x2935) {
                    return true;
                } else if (0x3297 <= hs && hs <= 0x3299) {
                    return true;
                } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
                    hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
                    hs == 0x2b50) {
                    return true;
                }
            }
        }
    },
    /**
     * 判断手机号码
     * @param：data
     * @returns {boolean}
     */
    isMobile: function(data) {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (myreg.test(data)) {
            return true;
        }
        return false;
    },
    /**
     * 随机字符串
     * @param：len
     * @returns string
     */
    randomString: function(len) {　　
        len = len || 32;　　
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';　
        var maxPos = $chars.length;　　
        var random = '';　　
        for (var i = 0; i < len; i++) {　　　　
            random += $chars.charAt(Math.floor(Math.random() * maxPos));　　
        }　　
        return random;
    },
    /**
     * 国内固定电话
     * @param：strPhoneNumber
     * @returns {boolean}
     */
    isTelPhoneNumber: function(strPhoneNumber) {
        var newPar = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
        return newPar.test(strPhoneNumber);
    },
    /**
     * 身份证号
     * @param：card
     * @returns {boolean}
     */
    isIDCardNumber: function(card) {
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return reg.test(card);
    },
    /**
     * 邮箱验证
     * @param：mail
     * @returns {boolean}
     */
    isEmail: function(mail) {
        var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return reg.test(mail);
    }
}
exports = module.exports = util;