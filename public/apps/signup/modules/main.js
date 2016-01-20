define(["knockout", "Super", "Tools"], function (ko, Super, Tools) {
    return function (context) {
        var self = Super.call(this, context);

        self.username = ko.observable('').extend({
            required    : {
                params  : true,
                message : "请填写用户名"
            },
            minLength   : {
                params  : 4,
                message : "用户名必须大于4个字符"
            },
            maxLength   : {
                params  : 20,
                message : "用户名不能长于20个字符"
            },
            pattern     : {
                params  : /^[A-Za-z0-9]+$/,
                message : "用户名只能由字母和数字构成"
            }
        });

        self.password = ko.observable('').extend({
            required    : {
                params  : true,
                message : "请填写密码"
            },
            minLength   : {
                params  : 4,
                message : "密码必须大于4个字符"
            },
            maxLength   : {
                params  : 20,
                message : "密码不能长于20个字符"
            },
            pattern     : {
                params  : /^[A-Za-z0-9]+$/,
                message : "密码只能由字母和数字构成"
            }
        });

        self.checked = ko.observable(true);

        self.errors = ko.validation.group(self);
        self.submit = function () {
            if (self.errors().length > 0) {
                self.errors.showAllMessages();
                return false;
            }

            Tools.ajax({
                url: "/signup",
                data: {
                    username: self.username(),
                    password: self.password()
                },
                success: function (returnData) {
                    console.log(returnData);
                }
            });
        };

        if (self.data.test) {
            main = self;
        }
    };
});
