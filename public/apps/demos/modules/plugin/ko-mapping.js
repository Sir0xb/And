define(["knockout", "Super"], function (ko, Super) {
    return function (context) {
        var self = Super.call(this, context);

        self.ko_value_1 = ko.mapping.fromJS({
            a: 1,
            b: 2
        });

        console.log(self.ko_value_1.a());  // 1
        console.log(self.ko_value_1.b());  // 2



        self.ko_value_2 = ko.observable(
            ko.mapping.fromJS({
                a: 1,
                b: 2
            })
        );

        console.log(self.ko_value_2().a());  // 1
        console.log(self.ko_value_2().b());  // 2



        self.ko_value_3 = ko.observableArray(
            ko.mapping.fromJS([{
                a: 1.1,
                b: 1.2
            }, {
                a: 2.1,
                b: 2.2
            }])()
        );

        console.log(self.ko_value_3()[0].a());  // 1.1
        console.log(self.ko_value_3()[1].b());  // 2.2



        self.ko_value_4 = ko.mapping.fromJS([{
            a: 1.1,
            b: 1.2
        }, {
            a: 2.1,
            b: 2.2
        }]);

        console.log(self.ko_value_4()[0].a());  // 1.1
        console.log(self.ko_value_4()[1].b());  // 2.2

        if (self.data.test) {
            ko_mapping = self;
        }
    };
});
