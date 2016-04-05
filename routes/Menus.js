var Tools = require("./resTools");

function createRoot(MenuDao) {
    MenuDao.save({
        menuId  : 'root',
        menuName: 'root',
        desc    : '根目录',
        link    : '/',
        level   : '0',
        subMenu : []
    }, function (err) {

    });
}

module.exports = function(app) {
    var MenuDao = require("../models/menuDao");

    // createRoot(MenuDao);

    app.get("/menus", function (req, res, next) {
        Tools.log('Menus', 'get', 'menus', '请求访问菜单管理', 'menus');

        MenuDao.findAll(function (err, obj) {
            Tools.pageJump(req, res, next, "index.html", "菜单管理", "menus", {
                menus: obj
            });
        });
    });

    app.post("/menus/update", function(req, res, next) {
        Tools.log("Menus", "post", "menus/update", "请求更新菜单");

        var rootMenu = req.body.menus[0];
        var menuId = rootMenu.menuId;

        MenuDao.findById(menuId, function (err, obj) {
            if (err || !obj) {
                res.json({
                    success: false,
                    message: '同步菜单错误，请联系管理员!'
                });
            } else {
                MenuDao.updateById(menuId, rootMenu, function (err) {
                    if (err) {
                        res.json({
                            success: false,
                            message: '同步菜单错误，请联系管理员!22'
                        });
                    } else {
                        res.json({
                            success: true
                        });
                    }
                });
            }
        });
    });
};
