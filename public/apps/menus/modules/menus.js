define(["knockout", "jquery", "ko-mapping", "semantic"], function (ko, $) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;

        // 要从mongodb获取
        var menuList = [
            { id: "menus", text: "菜单管理", description: "系统菜单管理与配置", link: "#/menus", submenus: [] },
            { id: "users", text: "用户管理", description: "系统用户管理与配置", link: "#/users", submenus: [] },
            { id: "apps", text: "应用管理", description: "应用配置", link: "#/apps", submenus: [
                { id: "ftpFiles", text: "CDN文件监控", description: '', link: "#/apps/ftpfiles", submenus: [] },
                { id: "cdnFrames", text: "框架版本管理", description: '',link: "#/apps/cdnfiles", submenus: [] },
                { id: "ftpFiles12", text: "CDN文件监控12", description: '',link: "#/apps/ftpfiles12", submenus: [] },
                { id: "cdnFrames12", text: "框架版本管理12", description: '',link: "#/apps/cdnfiles12", submenus: [
                    { id: "hehe", text: "呵呵", description: '',link: "#/apps/hehe" },
                    { id: "hehe1", text: "呵呵", description: "描素测试描素测试描素测试描素测试描素测试描素测试描素测试描素测试描素测试描素测试描素测试描素测试", link: "#/apps/hehe" },
                    { id: "hehe2", text: "呵呵", description: '',link: "#/apps/hehe" },
                    { id: "hehe3", text: "呵呵", description: '',link: "#/apps/hehe" }
                ] },
                { id: "ftpFiles34", text: "CDN文件监控34", description: '',link: "#/apps/ftpfiles34", submenus: [] },
                { id: "cdnFrames34", text: "框架版本管理34", description: '',link: "#/apps/cdnfiles34", submenus: [] }
            ] },
            { id: "demos", text: "测试用例", description: "测试用例管理", link: "#/demos", submenus: [] },
            { id: "crooms", text: "会议室预约", description: "会议室预约管理", link: "#/crooms", submenus: [] }
        ];

        self.getNewNode = function () {
            return {
                id          : ko.observable(""),
                text        : ko.observable(""),
                description : ko.observable(""),
                link        : ko.observable("")
            };
        };

        self.menuList = ko.observableArray(ko.mapping.fromJS(menuList)());
        self._focusMenu = ko.observable(self.getNewNode());
        self.focusMenu = ko.observable(ko.utils.extend(self.getNewNode(), {
            submenus: self.menuList
        }))
        self.focusMenuLevel = ko.observable(0);

        self.backToRoot = function () {
            self._focusMenu(self.getNewNode());
            self.focusMenu(ko.utils.extend(self.getNewNode(), {
                submenus: self.menuList
            }));
            self.focusMenuLevel(0);
        };

        self.editMenu = function (level) {
            var newMenu = self.getNewNode();
            newMenu.id(this.id());
            newMenu.text(this.text());
            newMenu.description(this.description());
            newMenu.link(this.link() == "javascript:void(0);" ? "" : this.link());

            self.focusMenu(this);
            self._focusMenu(newMenu);
            self.focusMenuLevel(level);
        };

        // 清空
        self.reset = function () {
            self._focusMenu(self.getNewNode());
        };

        self.isEmpty = function () {
            return self._focusMenu().id() == "" && self._focusMenu().text() == "" &&self._focusMenu().description() == "" &&self._focusMenu().link() == "";
        };

        // 保存修改
        self.saveChange = function () {
            self.focusMenu().id(self._focusMenu().id());
            self.focusMenu().text(self._focusMenu().text());
            self.focusMenu().description(self._focusMenu().description());
            self.focusMenu().link(self._focusMenu().link() == "" ? "javascript:void(0);" : self._focusMenu().link());
            self._focusMenu(self.getNewNode());
            self.focusMenu(self.getNewNode());
        };

        // 作为子菜单添加
        self.addSubMenu = function () {
            if (self.isEmpty()) {
                $('.ui.basic.modal').modal('show')
                return false;
            }

            if (!ko.isObservable(self.focusMenu().submenus)) {
                self.focusMenu().submenus = ko.observableArray([]);
            }
            self.focusMenu().submenus.push(self._focusMenu());

            self._focusMenu(self.getNewNode());
        };

        // 上移
        self.move = function () {
            var index = self.focusMenu().submenus().indexOf(this);
            self.focusMenu().submenus.remove(this);
            self.focusMenu().submenus.splice(index - 1, 0, this);
        };

        // 下移
        self.down = function () {
            var index = self.focusMenu().submenus().indexOf(this);
            self.focusMenu().submenus.remove(this);
            self.focusMenu().submenus.splice(index + 1, 0, this);
        };

        // 上加横线

        // 下加横线

        // 删除
        self.removeMenu = function () {
            // 需要增加提示逻辑
            self.focusMenu().submenus.remove(this);
        };

        self.parent.loading(false);

        if (self.parent.debug) {
            menus = self;
        }
    };
});
