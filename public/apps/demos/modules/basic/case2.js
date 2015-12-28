define(["knockout", "ko-mapping"], function (ko) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;

        // 原生数据
        self.list1 = [{
            a: 1, b: 1
        }, {
            a: 2, b: 2
        }, {
            a: 3, b: 3
        }];
        self.addItem1 = function () {
            self.list1.push({
                a: 1.1, b: 1.1
            });
        };
        self.changeContent1 = function () {
            this.a *= 10;
            this.b *= 10;
        };

        // ko数组
        self.list2 = ko.observableArray([{
            a: 1, b: 1
        }, {
            a: 2, b: 2
        }, {
            a: 3, b: 3
        }]);
        self.addItem2 = function () {
            self.list2.push({
                a: 1.1, b: 1.1
            });
        };
        self.changeContent2 = function () {
            this.a *= 10;
            this.b *= 10;
        };

        // ko数据
        self.list3 = ko.observableArray(ko.mapping.fromJS([{
            a: 1, b: 1
        }, {
            a: 2, b: 2
        }, {
            a: 3, b: 3
        }])());
        self.addItem3 = function () {
            self.list3.push({
                a: ko.observable(1.1), b: ko.observable(1.1)
            });
        };
        self.changeContent3 = function () {
            this.a(this.a() * 10);
            this.b(this.b() * 10);
        };

        self.parent.loading(false);

        //测试接口
        if (self.parent.debug) {
            case2 = self;             
        }
    };
});
