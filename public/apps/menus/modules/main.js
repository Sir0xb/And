define(["knockout", "jquery", "Super", "Tools", "ko-mapping", "semantic"], function (ko, $, Super, Tools) {
    return function (context) {
        var self = Super.call(this, context);

        // ID列表，用于验证ID重复
        self._IDs = [];
        (function (menus) {
            function forEachIds (list) {
                var that = arguments;

                ko.utils.arrayForEach(list, function (menu) {
                    self._IDs.push(menu.menuId);
                    if (menu.subMenu && menu.subMenu.length > 0) {
                        that.callee(menu.subMenu);
                    }
                });
            }

            forEachIds(menus);
        }(self.data.menus));

        // 菜单信息
        self.menuList = ko.observableArray(ko.mapping.fromJS(self.data.menus)());

        // 同步菜单函数
        self.synchronous = function () {
            var q = $.Deferred();
            Tools.ajax({
                url     : '/menus/update',
                data    : {
                    menus: ko.mapping.toJS(self.menuList)
                },
                success : function (returnData) {
                    console.log(returnData);
                    if (returnData.success) {
                        q.resolve();
                    }
                }
            });
            return q;
        };

        // 当前被选中的菜单数据
        self.focusMenu = ko.observable(ko.mapping.fromJS({
            menuId      : "",
            menuName    : "",
            desc        : "",
            link        : "",
            level       : "",
            subMenu     : []
        }));

        self._focusMenuParent = ko.observable(false);
        self.selectMenu = function (parent) {
            self.focusMenu(this);
            self._focusMenuParent(parent);
        };

        self.editMenu = function () {
            self.palette({
                name        : self.data.mapping.getJS("editMenu"),
                template    : self.data.mapping.getTemp("editMenu"),
                data        : { parent: self, data: self.data },
                afterRender : function () {
                    $('#wind').modal('show');
                }
            });
        };

        self.addSubMenu = function () {
            self.palette({
                name        : self.data.mapping.getJS("addSubMenu"),
                template    : self.data.mapping.getTemp("addSubMenu"),
                data        : { parent: self, data: self.data },
                afterRender : function () {
                    $('#wind').modal('show');
                }
            });
        };

        self.addDescMenu = function () {
            self.palette({
                name        : self.data.mapping.getJS('addDescMenu'),
                template    : self.data.mapping.getTemp('addDescMenu'),
                data        :{ parent: self, data: self.data },
                afterRender : function () {
                    $('#wind').modal('show');
                }
            });
        };

        self.addLine = function () {
            self.focusMenu().subMenu = self.focusMenu().subMenu || ko.observableArray([]);
            self.focusMenu().subMenu.push(ko.mapping.fromJS({
                menuId      : "",
                menuName    : "--------------------",
                desc        : "",
                link        : "",
                level       : "",
                subMenu     : []
            }));
            self.synchronous();
        };

        self.upMenu = function () {
            var index = self.focusMenu().subMenu.indexOf(this);
            self.focusMenu().subMenu.remove(this);
            self.focusMenu().subMenu.splice(index - 1, 0, this);
            self.synchronous();
        };

        self.downMenu = function () {
            var index = self.focusMenu().subMenu.indexOf(this);
            self.focusMenu().subMenu.remove(this);
            self.focusMenu().subMenu.splice(index + 1, 0, this);
            self.synchronous();
        };

        self.removeMenu = function () {
            if (confirm('确定要删除吗?')) {
                self._focusMenuParent().subMenu.remove(self.focusMenu());
                self.synchronous();
            }
        };

        self.removeSubMenu = function () {
            if (confirm('确定要删除吗？')) {
                self.focusMenu().subMenu.remove(this);
                self.synchronous();
            }
        };

        if (self.data.test) {
            main = self;
        }
    };
});
