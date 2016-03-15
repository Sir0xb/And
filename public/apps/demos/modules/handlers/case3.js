define(["knockout", "ko-textcut", "ko-hover", "ko-beforeSubscribe", "ko-onecBeforeSubscribe", "ko-onecSubscribe"], function (ko) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.text1 = "1234567890abcdefghijklmnopqrstuvwxyz";

        self.text2 = ko.observable("abc");
        self.text2.subscribe(function (newValue, oldValue) {
            console.log(newValue);
            console.log(oldValue);
        });
        self.text3 = ko.observable("abc");
        self.text3.beforeSubscribe(function (newValue, oldValue) {
            console.log(newValue);
            console.log(oldValue);

            if (oldValue == "1234") {
                self.text3("1234");
            }
        });

        self.text4 = ko.observable("abc");
        self.text4.beforeSubscribe(function (newValue, oldValue) {
            console.log("beforeSubscribe 第一次绑定");
            console.log(newValue);
            console.log(oldValue);
        });
        self.text4.beforeSubscribe(function (newValue, oldValue) {
            console.log("beforeSubscribe 第二次绑定");
            console.log(newValue);
            console.log(oldValue);
        });
        self.text4.onecBeforeSubscribe(function (newValue, oldValue) {
            console.log("onecBeforeSubscribe 第一次绑定");
            console.log(newValue);
            console.log(oldValue);
        });
        self.text4.onecBeforeSubscribe(function (newValue, oldValue) {
            console.log("onecBeforeSubscribe 第二次绑定");
            console.log(newValue);
            console.log(oldValue);
        });

        self.text5 = ko.observable("abc");
        self.text5.subscribe(function (newValue) {
            console.log("subscribe 第一次绑定");
            console.log(newValue);
        });
        self.text5.subscribe(function (newValue) {
            console.log("subscribe 第二次绑定");
            console.log(newValue);
        });
        self.text5.onecSubscribe(function (newValue) {
            console.log("onecSubscribe 第一次绑定");
            console.log(newValue);
        });
        self.text5.onecSubscribe(function (newValue) {
            console.log("onecSubscribe 第二次绑定");
            console.log(newValue);
        });

        //测试接口
        if (self.parent.debug) {
            case4 = self;
        }
    };
});
