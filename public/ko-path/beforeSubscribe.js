define(["knockout"], function (ko) {
    ko.observable.fn.beforeSubscribe = function (callback, target) {
        var _oldValue = null;

        this.subscribe(function (oldValue) {
            _oldValue = oldValue;
        }, null, "beforeChange");

        this.subscribe(function (newValue) {
            callback.call(target, newValue, _oldValue);
        });
    };
});
