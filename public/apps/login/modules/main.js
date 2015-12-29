define(["knockout", "Super"], function (ko, Super) {
    return function (context) {
        var self = Super.call(this, context);

        console.log(11111);

        if (self.data.test) {
            main = self;
        }
    };
});
