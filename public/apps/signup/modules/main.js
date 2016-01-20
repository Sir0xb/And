define(["knockout", "Super"], function (ko, Super) {
    return function (context) {
        var self = Super.call(this, context);

        self.username = ko.observable('').extend({
            required    : true,
            minLength   : 4,
            maxLength   : 20,
            pattern     : {
                message : "请输入长度为4-20的字母数字组成的用户名",
                params  : '^[a-zA-Z0-9].$'
            }
        });

        self.password = ko.observable('').extend({
            required    : true,
            minLength   : 4,
            maxLength   : 20,
            pattern     : {
                message : "请输入长度为4-20的字母数字组成的密码",
                params  : '^[a-zA-Z0-9].$'
            }
        });

        self.errors = ko.validation.group(self);
        self.submit = function () {
            if (self.errors().length > 0) {
                self.errors.showAllMessages();
                return false;
            }
        };

        if (self.data.test) {
            main = self;
        }
    };
});
