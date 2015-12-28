define(["knockout"], function (ko) {
    ko.bindingHandlers.hover = {
        init: function(element, valueAccessor){
            ko.utils.registerEventHandler(element, "mouseenter", function () {
                ko.utils.toggleDomNodeCssClass(element, valueAccessor(), true);
            });

            ko.utils.registerEventHandler(element, "mouseleave", function () {
                ko.utils.toggleDomNodeCssClass(element, valueAccessor(), false);
            });
        }
    };
});
