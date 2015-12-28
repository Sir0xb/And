define(["knockout"], function (ko) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.cache = ko.observable("hehe this is apps information");

        self.parent.loading(false);
    };
});
