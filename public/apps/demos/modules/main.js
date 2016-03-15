define(["knockout", "Super", "sammy", "marked", "hljs"], function (ko, Super, Sammy, marked, highlight) {
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

                        $('code').each(function(i, block) {
                            hljs.highlightBlock(block);
                        });
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
