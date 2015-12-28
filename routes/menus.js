var mongoose = require("mongoose");

module.exports = function(app) {
    app.post("/menus/load", function(req, res, next) {
        var Menu = mongoose.model("Menu");

        // var menu = new Menu({
        //     menuId      : 'menus',
        //     menuName    : '菜单管理',
        //     level       : 0,
        //     link        : '#/menus',
        //     desc        : '菜单管理',
        //     subMenu     : []
        // });
        // menu.save(function (err) {
        //     console.log('save status:',err ? 'failed' : 'success');
        // });
        // menu = new Menu({
        //     menuId      : 'users',
        //     menuName    : '用户管理',
        //     level       : 0,
        //     link        : '#/users',
        //     desc        : '',
        //     subMenu     : []
        // });
        // menu.save(function (err) {
        //     console.log('save status:',err ? 'failed' : 'success');
        // });
        // menu = new Menu({
        //     menuId      : 'apps',
        //     menuName    : '应用管理',
        //     level       : 0,
        //     link        : '#/apps',
        //     desc        : '',
        //     subMenu     : []
        // });
        // menu.save(function (err) {
        //     console.log('save status:',err ? 'failed' : 'success');
        // });
        // menu = new Menu({
        //     menuId      : 'demos',
        //     menuName    : '测试用例',
        //     level       : 0,
        //     link        : '#/demos',
        //     desc        : '',
        //     subMenu     : []
        // });
        // menu.save(function (err) {
        //     console.log('save status:',err ? 'failed' : 'success');
        // });
        // menu = new Menu({
        //     menuId      : 'crooms',
        //     menuName    : '会议室预约',
        //     level       : 0,
        //     link        : '#/crooms',
        //     desc        : '会议室预约',
        //     subMenu     : []
        // });
        // menu.save(function (err) {
        //     console.log('save status:',err ? 'failed' : 'success');
        // });

        Menu.find({}, function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(results);
            res.contentType('json');
            res.send(JSON.stringify(results));
            res.end();
        });



        //
        //
        //
        // var Menu = mongoose.model("Menu");
        //
        // Menu.find({}, function (err, results) {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     console.log(results);
        // });
        //
        // res.contentType('json');
        // res.send(JSON.stringify({
        //     status: "success",
        //     data: [
        //         { id: "menus", text: "菜单管理", link: "#/menus" },
        //         { id: "users", text: "用户管理", link: "#/users" },
        //         { id: "apps", text: "应用管理", link: "#/apps" },
        //         { id: "demos", text: "测试用例", link: "#/demos"},
        //         { id: "crooms", text: "会议室预约", link: "#/crooms"}
        //     ]
        //
        //     data: [
        //         { id: "menus", text: "菜单管理", description: "系统菜单管理与配置", link: "#/menus", submenus: [] },
        //         { id: "users", text: "用户管理", description: "系统用户管理与配置", link: "#/users", submenus: [] },
        //         { id: "apps", text: "应用管理", description: "应用配置", link: "#/apps", submenus: [
        //             { id: "ftpFiles", text: "CDN文件监控", description: '', link: "#/apps/ftpfiles", submenus: [] },
        //             { id: "cdnFrames", text: "框架版本管理", description: '',link: "#/apps/cdnfiles", submenus: [] },
        //             { id: "ftpFiles12", text: "CDN文件监控12", description: '',link: "#/apps/ftpfiles12", submenus: [] },
        //             { id: "cdnFrames12", text: "框架版本管理12", description: '',link: "#/apps/cdnfiles12", submenus: [
        //                 { id: "hehe", text: "呵呵", description: '',link: "#/apps/hehe" },
        //                 { id: "hehe1", text: "呵呵", description: "描素测试描素测试描素测试描素测试描素测试描素测试描素测试描素测试描素测试描素测试描素测试描素测试", link: "#/apps/hehe" },
        //                 { id: "hehe2", text: "呵呵", description: '',link: "#/apps/hehe" },
        //                 { id: "hehe3", text: "呵呵", description: '',link: "#/apps/hehe" }
        //             ] },
        //             { id: "ftpFiles34", text: "CDN文件监控34", description: '',link: "#/apps/ftpfiles34", submenus: [] },
        //             { id: "cdnFrames34", text: "框架版本管理34", description: '',link: "#/apps/cdnfiles34", submenus: [] }
        //         ] },
        //         { id: "demos", text: "测试用例", description: "测试用例管理", link: "#/demos", submenus: [] },
        //         { id: "crooms", text: "会议室预约", description: "会议室预约管理", link: "#/crooms", submenus: [] }
        //     ]
        // }));
        // res.end();
    });
};
