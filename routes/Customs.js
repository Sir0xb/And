var Tools = require("./resTools");

module.exports = function (app) {
    app.get("/:url", function (req, res, next) {
        Tools.log('Customs', 'get', req.params.url, '进入检查');

        // if (!req.session.user) {
        //     Tools.log('Customs', 'get', req.params.url, '未登录用户', 'login');
        //     Tools.pageJump(req, res, next, "index.html", "登录", "login");
        //     next();
        // } else {
        //     Tools.log('Customs', 'get', req.params.url, '登陆用户，放行');
        //     next();
        // }
        next();
    });

    app.post("/:url", function (req, res, next) {
        Tools.log('Customs', 'post', req.params.url, '未检查');
        next();
    });
};
