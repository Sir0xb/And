define(["knockout", "sammy"], function (ko, Sammy) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.palette = ko.observable({});

        self.cache = ko.observable("");

        self.demolist = ko.observableArray([{
            id: "basic", text: "基本用法", childen: [{
                id: "case1", text: "case1", name: "basic/case1"
            }, {
                id: "case2", text: "case2", name: "basic/case2"
            }]
        }, {
            id: "handlers", text: "扩展用法", childen: [{
                id: "case3", text: "case3", name: "handlers/case3"
            }]
        }]);
        self.current_demo = ko.observable(self.demolist()[0]);
        self.current_demo.subscribe(function (newValue) {
            self.palette({
                name        : newValue.name,
                data        : self,
                afterRender : function (){
                    $("body").trigger("reportReady");
                }
            });
        });

        self.changeType = function () {
            if (this["childen"]) {
                $("#" + this.id).siblings("ul.nav").toggle()
            } else {
                self.current_demo(this);
            }
        };

        // Sammy(function () {
        //     this.get(/\#\/([^/]+)\/([^/]+)/, function (){
        //         var area    = this.params.splat[0];
        //         var module  = this.params.splat[1];
        //
        //         self.current_menu(module);
        //
        //         self.palette({
        //             name: area + "/" + module,
        //             data: {
        //                 parent  : self,
        //                 data    : self.data
        //             },
        //             afterRender: function (){
        //                 ko.utils.triggerEvent(document.body, "pageReady");
        //             }
        //         });
        //         self.loading(true);
        //     });
        // });
        //
        // Sammy().run();

        self.parent.loading(false);
    };
});
