var Tools = require("./resTools");

module.exports = function(app) {
    app.get("/login", function (req, res, next) {
        Tools.pageJump(req, res, next, "index.html", "登录", "login", {
            test: true
        });
    });

    app.post("/login", function (req, res, next) {
        req.flash("error", "用户名或密码错误");
        return res.redirect("/login");
    });
};
