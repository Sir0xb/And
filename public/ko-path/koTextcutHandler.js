define(["knockout"], function (ko) {
    ko.bindingHandlers.textcut = {
        init: function(element, valueAccessor){
            var options = ko.utils.unwrapObservable(valueAccessor());

            ko.utils.setTextContent(element, options.text.length > options.length ? options.text.substring(0, options.length) + "..." : options.text);
        },
        update: function(element, valueAccessor){
            var options = ko.utils.unwrapObservable(valueAccessor());

            ko.utils.setTextContent(element, options.text.length > options.length ? options.text.substring(0, options.length) + "..." : options.text);
        }
    }
});
