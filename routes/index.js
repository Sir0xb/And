var Tools = require("./resTools");

var Customs = require("./Customs");
var Menus = require("./Menus.js");
var Login = require("./Login.js");

module.exports = function (app) {
    var MenuDao = require("../models/menuDao");

    app.get("/", function (req, res, next) {
        if(!req.session.user){
            return res.redirect("/login");
        }

        // MenuDao.findByName({}, function (err) {
        //     console.log(err);
        // });

        Tools.pageJump(req, res, next, "index.html", "首页", "welcome", {
            test: true
        });
    });

    Menus(app);

    Login(app);
};
