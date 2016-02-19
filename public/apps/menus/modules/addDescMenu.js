define(["knockout", "Super", "ko-mapping", "ko-validation"], function (ko, Super) {
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
        self.focusMenu().menuName = ko.observable('').extend({
            required: {
                params  : true,
                message : '请填写说明内容'
            }
        });

        self.focusMenu().errors = ko.validation.group(self.focusMenu());

        self.submit = function () {
            if (self.focusMenu().errors().length > 0) {
                self.errors.showAllMessages();
                return false;
            } else {
                self.parent.focusMenu().subMenu = self.parent.focusMenu().subMenu || ko.observableArray([]);
                self.parent.focusMenu().subMenu.push(self.focusMenu());

                var promise = self.parent.synchronous();
                promise.done(function () {
                    $('#wind').modal('hide');
                });
            }
        };

        if (self.data.test) {
            addDescMenu = self;
        }
    };
});
