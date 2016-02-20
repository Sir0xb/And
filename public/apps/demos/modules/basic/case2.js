define(["knockout", "Super", "ko-mapping"], function (ko, Super) {
    return function (context) {
        var self = Super.call(this, context);

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

        //测试接口
        if (self.parent.debug) {
            case2 = self;
        }
    };
});
