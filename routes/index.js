var Tools = require("./resTools");

var Login = require("./Login");
var Signup = require("./Signup");

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

    Login(app);
    
    Signup(app);
};
