define(["knockout", "Super", "sammy"], function (ko, Super, Sammy) {
    return function (context) {
        var self = Super.call(this, context);

        Sammy(function () {
            this.get(/\#\/([\s\S]*)/, function (){
                var module = this.params.splat[0];

                self.palette({
                    name    : self.data.mapping.getJS(module),
                    template: self.data.mapping.getTemp(module),
                    data    : {
                        parent  : self,
                        data    : self.data
                    },
                    afterRender: function (){
                        ko.utils.triggerEvent(document.body, "pageReady");
                    }
                });
            });
        });

        Sammy().run();

        if (self.data.test) {
            main = self;
        }
    };
});
