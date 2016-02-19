define(["knockout", "jquery"], function (ko, $) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.text1 = "测试数据内容";
        self.text2 = ko.observable("测试数据内容");
        self.text3 = ko.observable("测试数据内容");
        self.text4 = ko.observable("<s>测试数据内容</s>");
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
        $('body').one('pageReady', function () {
            $('.ui.accordion').accordion();
        });

        //测试接口
        if (self.parent.debug) {
            case1 = self;
        }
    };
});
