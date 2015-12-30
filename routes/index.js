var Customs = require("./Customs");
var Menus = require("./Menus.js");
var Login = require("./Login.js");

module.exports = function (app) {
    var MenuDao = require("../models/menuDao");

    app.get("/", function (req, res) {
        if(!req.session.user){
            req.flash("error", "请先登录");
            return res.redirect("/login");
        }

        MenuDao.findByName({}, function (err) {
            console.log(err);
        });

        if (req.query.unitTest) {
            res.render("viewport/unitTest.html", {
                title   : "接口测试",
                appName : "welcome",
                showTest: true
            });
        } else {
            res.render("index.html", {
                success : req.flash("success").toString(),
                warning : req.flash("warning").toString(),
                error   : req.flash("error").toString(),
                title   : "首页",
                appName : "welcome",
                showTest: false,
                params  : {
                    test: true
                }
            });
        }
    });

    Menus(app);

    Login(app);
};
