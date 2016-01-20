var Tools = require("./resTools");

module.exports = function (app) {
    var UserDao = require("../models/userDao");

    app.get("/signup", function (req, res, next) {
        Tools.pageJump(req, res, next, "index.html", "注册", "signup", {
            test: true
        });
    });

    app.post("/signup", function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        console.log(username);
        console.log(password);

        UserDao.findByName(username, function (err, obj) {
            console.log(err);
            console.log(obj);

            if (err) {
                res.json({
                    success: false,
                    message: "系统异常，请联系管理员"
                });
            } else if (obj) {
                res.json({
                    success: false,
                    message: "用户已存在"
                });
            } else {
                UserDao.save({
                    username: username,
                    password: password
                }, function (err) {
                    if (!err) {
                        res.json({
                            success  : true,
                            message  : "创建成功"
                        });
                    }
                });
            }
        });
    });
};
