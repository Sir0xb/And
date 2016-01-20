var Tools = require("./resTools");

module.exports = function(app) {
    var UserDao = require("../models/userDao");

    app.get("/login", function (req, res, next) {
        if (req.session.user) {
            Tools.pageJump(req, res, next, "index.html", "首页", "welcome");
        } else {
            Tools.pageJump(req, res, next, "index.html", "登录", "login");
        }
    });

    app.post("/login", function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        console.log(username);
        console.log(password);

        UserDao.findByName(username, function (err, obj) {
            console.log(err);
            console.log(obj);

            if (err || !obj) {
                res.json({
                    success: false,
                    message: '用户名或密码错误'
                });
            } else {
                if (obj.username == username && obj.password == password) {
                    res.json({
                        success: true
                    });
                } else {
                    res.json({
                        success: false,
                        message: '用户名或密码错误'
                    });
                }
            }
        });
    });
};
