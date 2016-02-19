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
                params  : /^\/[A-Za-z0-9]+$/,
                message : '应用地址格式错误( /xxxxx )'
            }
        });

        this.errors = ko.validation.group(this);
    }

    return function (context) {
        var self = Super.call(this, context);

        self.focusMenu = ko.observable(ko.mapping.fromJS({
            menuId      : "",
            menuName    : "",
            desc        : "",
            link        : "",
            level       : "",
            subMenu     : []
        }));

        MenuValidation.call(self.focusMenu(), self.parent._IDs);

        self.submit = function () {
            if (self.focusMenu().errors().length > 0) {
                self.focusMenu().errors.showAllMessages();
                return false;
            } else {
                self.parent.focusMenu().subMenu = self.parent.focusMenu().subMenu || ko.observableArray([]);
                self.parent.focusMenu().subMenu.push(self.focusMenu());

                self.parent._IDs.push(self.focusMenu().menuId());

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
