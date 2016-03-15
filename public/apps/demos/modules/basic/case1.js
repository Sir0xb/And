define(["knockout", "Super", "jquery"], function (ko, Super, $) {
    return function (context) {
        var self = Super.call(this, context);

        self.text1 = "测试数据内容";
        self.text2 = ko.observable("测试数据内容");
        self.text3 = ko.observable("测试数据内容");
        self.text4 = ko.observable("<s>测试数据内容</s>");
        self.text5 = function () {
            console.log('text5 函数被运行');
            return "测试数据内容";
        };

        self.text6_1 = ko.observable('123456');
        self.text6_2 = ko.observable('abcdef');
        self.text6 = ko.pureComputed({
            read: function () {
                return this.text6_1() + ' ' + this.text6_2();
            },
            write: function (value) {
                var lastSpacePos = value.lastIndexOf(" ");
                if (lastSpacePos > 0) {
                    this.text6_1(value.substring(0, lastSpacePos));
                    this.text6_2(value.substring(lastSpacePos + 1));
                }
            },
            owner: self
        });

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
