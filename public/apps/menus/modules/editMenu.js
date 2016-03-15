define(["knockout", "Super", "ko-mapping", "ko-validation"], function (ko, Super) {
    function MenuValidation(IDs) {
        this.menuId.extend({
            required    : {
                params  : true,
                message : "请填写菜单ID"
            },
            menuId     : {
                params  : IDs,
                message : "当前ID已被使用"
            }
        });

        this.menuName.extend({
            required: {
                params  : true,
                message : '请填写菜单名称'
            }
        });

        this.link.extend({
            required: {
                params  : true,
                message : '请填写应用地址'
            },
            pattern: {
                params  : /^\/[A-Za-z0-9]{0,}/,
                message : '应用地址格式错误( /xxxxx )'
            }
        });

        this.errors = ko.validation.group(this);
    }

    return function (context) {
        var self = Super.call(this, context);

        self._IDs = [].concat(self.parent._IDs);
        (function () {
            var index = self._IDs.indexOf(self.parent.focusMenu().menuId());
            self._IDs.splice(index, 1);
        }());

        self.focusMenu = ko.observable(
            ko.mapping.fromJS(
                ko.utils.extend({}, ko.mapping.toJS(
                    self.parent.focusMenu()
                ))
            )
        );
        MenuValidation.call(self.focusMenu(), self._IDs);

        self.submit = function () {
            if (self.focusMenu().errors().length > 0) {
                self.focusMenu().errors.showAllMessages();
                return false;
            } else {
                self.parent.focusMenu().menuId(self.focusMenu().menuId());
                self.parent.focusMenu().menuName(self.focusMenu().menuName());
                self.parent.focusMenu().desc(self.focusMenu().desc());
                self.parent.focusMenu().link(self.focusMenu().link());
                self.parent.focusMenu().level(self.focusMenu().level());
                if (self.parent.focusMenu().subMenu) {
                    self.parent.focusMenu().subMenu(self.focusMenu().subMenu());
                }

                self._IDs.push(self.focusMenu().menuId());
                self.parent._IDs = [].concat(self._IDs);

                var promise = self.parent.synchronous();
                promise.done(function () {
                    $('#wind').modal('hide');
                });
            }
        };

        if (self.data.test) {
            editMenu = self;
        }
    };
});
