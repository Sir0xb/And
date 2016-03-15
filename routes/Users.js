var Tools = require("./resTools");

module.exports = function(app) {
    app.get("/users", function (req, res, next) {
        Tools.log('Users', 'get', 'users', '用户管理页面', 'users');
        Tools.pageJump(req, res, next, "index.html", "用户管理", "users");
    });
};
