var Tools = require("./resTools");

module.exports = function(app) {
    var UserDao = require("../models/userDao");

    app.get("/login", function (req, res, next) {
        Tools.log('Login', 'get', 'login', '请求登陆', 'login');
        Tools.pageJump(req, res, next, "index.html", "登录", "login");
    });

    app.get("/logout", function (req, res, next) {
        req.session.user = null;
        Tools.log('Login', 'get', 'logout', '请求退出系统', 'login');
        Tools.pageJump(req, res, next, "index.html", "登录", "login");
    });

    app.post("/login", function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        Tools.log('Login', 'post', 'login', '用户名: ' + username);
        Tools.log('Login', 'post', 'login', '密码: ' + password);

        UserDao.findByName(username, function (err, obj) {
            Tools.log('Login', 'post', 'findByName', 'error: ' + err);
            Tools.log('Login', 'post', 'findByName', 'obj: ' + obj);

            if (err || !obj) {
                res.json({
                    success: false,
                    message: '用户名或密码错误'
                });
            } else {
                if (obj.username == username && obj.password == password) {
                    req.session.user = username;
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
