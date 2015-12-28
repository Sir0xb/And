define(["knockout", "Super"], function (ko, Super) {
    return function (context) {
        var self = Super.call(this, context);

        console.log("welcome application");
        self.palette({
            
        });

        if (self.data.test) {
            app = self;
        }
    };
});
