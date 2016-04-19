var Tools = require("./resTools");

var Customs = require("./Customs");
var Demos = require("./Demos");
var Login = require("./Login");
var Signup = require("./Signup");
var Menus = require("./Menus");
var Users = require("./Users");
var ResourceDepot = require("./ResourceDepot");
var Upload = require("./Upload");
var NpmPublish = require("./NpmPublish");
var userDao = require("../models/userDao");

module.exports = function (app) {
    Customs(app);

    app.get("/", function (req, res, next) {
        if (req.session.user) {
            Tools.log('Route', 'get', '', '登录用户', 'welcome');
            Tools.pageJump(req, res, next, "index.html", "首页", "welcome");
        } else {
            Tools.log('Route', 'get', '', '未登录用户', 'login');
            Tools.pageJump(req, res, next, "index.html", "登录", "login");
        }
    });

    Demos(app);

    Login(app);

    Menus(app);

    ResourceDepot(app);

    Signup(app);

    Upload(app);

    NpmPublish(app);

    Users(app);
};
