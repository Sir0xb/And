define(["knockout", "sammy"], function (ko, Sammy) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.menus = ko.observableArray(self.data.menus);
        self.current_menu = ko.observable("");

        $.post("/menus/load", function (rd) {
            self.menus(rd);
            Sammy(function () {
                this.templateCache = function (){ };

                this.get(/\#\/([^/]+)/, function (){
                    var module    = this.params.splat[0];

                    ko.bindingHandlers.module.baseDir = "../apps/" + module + "/modules";
                    // // ko.amdTemplateEngine.defaultSuffix = ".blue.html";
                    ko.amdTemplateEngine.defaultPath = "../apps/" + module + "/templates";

                    console.log(ko.bindingHandlers.module.baseDir);
                    console.log(ko.amdTemplateEngine.defaultPath);

                    self.current_menu(module);

                    self.palette({
                        name: module,
                        data: {
                            parent  : self,
                            data    : self.data
                        },
                        disposeMethod: 'clean',
                        afterRender: function (){
                            ko.utils.triggerEvent(document.body, "pageReady");
                        }
                    });
                    self.loading(true);
                });

                this.get("/", function () {
                    this.app.runRoute("get", self.menus()[0].link);
                });
            });

            Sammy().run();
        });

        self.palette = ko.observable({});

        self.debug = true;
        self.loading = ko.observable(false);

    };
});
