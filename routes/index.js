var Customs = require("./Customs");

require("../config/mongodb");

var crooms = require("./crooms.js");
var users = require("./users.js");
var menus = require("./menus.js");

module.exports = function (app) {
    // 检查权限
    // Customs(app);

    app.get("/", function (req, res) {
        if (req.query.unitTest) {
            res.render("viewport/unitTest.html", {
                title   : "接口测试",
                appName : "welcome",
                showTest: true
            });
        } else {
            res.render("index.html", {
                title   : "首页",
                appName : "welcome",
                showTest: false,
                params  : {
                    test: true
                }
            });
        }
    });

    // 用户相关信息托管
    // users(app);
    //
    // // 托管菜单
    // menus(app);
    //
    // // 会议室接口托管
    // crooms(app);
};
