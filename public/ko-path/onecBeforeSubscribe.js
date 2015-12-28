define(["knockout"], function (ko) {
    ko.observable.fn.onecBeforeSubscribe = function (callback, target) {
        var self = this;

        if (!self.isOnecBeforeSubscribe) {
            var _oldValue = null;

            this.subscribe(function (oldValue) {
                _oldValue = oldValue;
            }, null, "beforeChange");

            this.subscribe(function (newValue) {
                callback.call(target, newValue, _oldValue);
            });

            self.isOnecBeforeSubscribe = true;
        }
    };    
});
