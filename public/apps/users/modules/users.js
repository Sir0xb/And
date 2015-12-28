define(["knockout"], function (ko) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.cache = ko.observable("this is users information");

        self.palette = ko.observable({});

        self.parent.loading(false);
    };
});
