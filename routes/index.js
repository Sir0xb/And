var Customs = require("./Customs");

require("../config/mongodb");

var crooms = require("./crooms.js");
var users = require("./users.js");
var menus = require("./menus.js");

module.exports = function (app) {
    // 检查权限
    // Customs(app);

    app.get("/", function (req, res) {
        res.render("index.html", {
            title   : "首页",
            appName : "welcome",
            params  : {
                test: true
            }
        });
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
