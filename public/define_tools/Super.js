define(["knockout", "semantic", "ko-mapping", "ko-validation"], function (ko) {
    return function (context) {
        var self = this;

        ko.validation.configure({
            decorateElement     : false,
            registerExtenders   : true,
            messagesOnModified  : true,
            insertMessages      : false,
            parseInputAttributes: true,
            messageTemplate     : null,
            errorClass          : 'error'
        });

        self.parent = context.parent;
        self.data = context.data;
        self.loading = ko.observable(false);
        self.palette = ko.observable({});

        self.msg = self.parent.msg || {
            title   : ko.observable('系统消息'),
            type    : ko.observable(''),
            message : ko.observable(''),
            colors  : ["grey", "blue", "green", "teal", "yellow", "orange", "red", "violet", "purple", "pink", "brown", "black", "olive"],
            buttons : ko.observableArray([]),
            reset   : function () {
                self.msg.title('系统消息');
                self.msg.type("send");
                self.msg.message('');
                self.buttons([]);
            },
            success : function (content, callback) {
                self.msg.message(content);
                self.msg.buttons([{
                    text    : "知道了",
                    callback: callback || function () { }
                }]);
                $("#__message__").modal("show");
            }
        };

        return self;
    };
});
