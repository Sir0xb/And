define(["knockout"], function (ko) {
    ko.observable.fn.onecSubscribe = function (callback, target, event) {
        var self = this;

        if (!self.isOnecSubscribe) {
            ko.subscription = function (target, callback, disposeCallback) {
                this.target = target;
                this.callback = callback;
                this.disposeCallback = disposeCallback;
                this.isDisposed = false;
                ko.exportProperty(this, 'dispose', this.dispose);
            };

            event = event || "change";

            var boundCallback = target ? callback.bind(target) : callback;

            var subscription = new ko.subscription(self, boundCallback, function () {
                ko.utils.arrayRemoveItem(self._subscriptions[event], subscription);
                if (self.afterSubscriptionRemove) {
                    self.afterSubscriptionRemove(event);
                }
            });

            if (self.beforeSubscriptionAdd) {
                self.beforeSubscriptionAdd(event);
            }

            if (!self._subscriptions[event]) {
                self._subscriptions[event] = [];
            }
            self._subscriptions[event].push(subscription);

            self.isOnecSubscribe = true;

            return subscription;
        } else {
            return self;
        }
    };
});
