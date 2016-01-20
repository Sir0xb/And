define(["knockout", "Super", "Tools"], function (ko, Super, Tools) {
    return function (context) {
        var self = Super.call(this, context);

        self.username = ko.observable('').extend({
            required    : {
                params  : true,
                message : "请填写用户名"
            },
            minLength   : {
                params : 4,
                message : "用户名至少四个字符"
            },
            maxLength   : {
                params  : 20,
                message : "用户名最大长度为30个字符"
            },
            required    : {
                params: true,
                message: "请输入用户名"
            }
        });

        self.password = ko.observable('').extend({
            required : {
                params: true,
                message: "请输入密码"
            }
        });

        self.errors = ko.validation.group(self);
        self.login = function () {
            if (self.errors().length > 0) {
                self.errors.showAllMessages();
                return false;
            }

            Tools.ajax({
                url : "/login",
                data: {
                    username: self.username(),
                    password: self.password()
                },
                succss: function (returnData) {
                    console.log(returnData);
                }
            });
        };

        if (self.data.test) {
            main = self;
        }
    };
});
