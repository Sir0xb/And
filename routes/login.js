var Tools = require("./resTools");

module.exports = function(app) {
    app.get("/login", function (req, res, next) {
        Tools.pageJump(req, res, next, "index.html", "登录", "login", {
            test: true
        });
    });

    app.post("/login", function (req, res, next) {
        req.flash("error", "无权访问");
        return res.redirect("/login");
    });
};
