var Tools = require("./resTools");

var Customs = require("./Customs");
var Demos = require("./Demos");
var Login = require("./Login");
var Signup = require("./Signup");
var Menus = require("./Menus");

module.exports = function (app) {
    app.get("/", function (req, res, next) {
        if (req.session.user) {
            Tools.log('Route', 'get', '', '登录用户', 'welcome');
            Tools.pageJump(req, res, next, "index.html", "首页", "welcome");
        } else {
            Tools.log('Route', 'get', '', '未登录用户', 'login');
            Tools.pageJump(req, res, next, "index.html", "登录", "login");
        }
    });

    Customs(app);

    Demos(app);

    Login(app);

    Signup(app);

    Menus(app);
};
