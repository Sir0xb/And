define(["knockout", "jquery", "Tools", "ko-mapping", "semantic"], function (ko, $, Tools) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.root = self.data.menus[0];
        self.menuList = ko.observableArray(ko.mapping.fromJS(self.root.subMenu)());

        self.updateMenu = function () {
            self.root.subMenu = ko.mapping.toJS(self.menuList);
            Tools.ajax({
                url: "/menus/update",
                data: { menus: [self.root] },
                success: function (returnData) {
                    console.log(returnData);
                }
            });
        };


        self.getNewNode = function () {
            return ko.mapping.fromJS({
                menuId      : "",
                menuName    : "",
                desc        : "",
                link        : "",
                level       : "",
                subMenu     : []
            });
        };

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

        if (self.data.test) {
            main = self;
        }
    };
});
