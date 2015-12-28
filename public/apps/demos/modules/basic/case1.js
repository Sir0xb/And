define(["knockout"], function (ko) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.text1 = "string";
        self.text2 = ko.observable("string");
        self.text3 = ko.observable("string");
        self.text4 = ko.observable("<s>string</s>");
        self.text5 = function () {
            console.log('text5 函数被运行');
            return "string";
        };

        self.text6 = ko.pureComputed({
            read: function () {
                return this.text2() + ' ' + this.text3();
            },
            write: function (value) {
                var lastSpacePos = value.lastIndexOf(" ");
                if (lastSpacePos > 0) {
                    this.text2(value.substring(0, lastSpacePos));
                    this.text3(value.substring(lastSpacePos + 1));
                }
            },
            owner: self
        });

        self.parent.loading(false);

        //监听测试
        ko.utils.registerEventHandler(document.body, "pageReady", function () {
            console.log("ko event");
        });

        //测试接口
        if (self.parent.debug) {
            case1 = self;
        }
    };
});
