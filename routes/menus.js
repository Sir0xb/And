var Tools = require("./resTools");

module.exports = function(app) {
    var MenuDao = require("../models/menuDao");

    app.get("/menus", function (req, res, next) {
        Tools.log('Menus', 'get', 'menus', '请求访问菜单管理', 'menus');

        MenuDao.findAll(function (err, obj) {
            Tools.pageJump(req, res, next, "index.html", "菜单管理", "menus", {
                menus: obj
            });
        });
    });

    app.post("/menus/update", function(req, res, next) {
        var menus = req.body.menus;

        Tools.log("Menus", "post", "menus/update", "请求更新菜单");

        MenuDao.findById({ menuId: menus }, function (err, obj) {

        });
    });
};
