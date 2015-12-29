var Customs = require("./Customs");
var Menus = require("./Menus.js");

module.exports = function (app) {
    var MenuDao = require("../models/menuDao");

    app.get("/", function (req, res) {
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
};
