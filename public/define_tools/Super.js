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

        // self.msg = self.parent.msg || {
        //     reset   : function () {
        //         this.type("send");
        //         this.content('');
        //     },
        //     type    : ko.observable("send"),
        //     types   : {
        //         info    : "send",
        //         success : "send",
        //         warning : "legal",
        //         error   : "bomb"
        //     },
        //     title   : ko.observable("系统消息"),
        //     content : ko.observable(''),
        //     colors  : ["grey", "blue", "green", "teal", "yellow", "orange", "red", "violet", "purple", "pink", "brown", "black", "olive"],
        //     actions : ko.observableArray([]),
        //     buttons : ko.observableArray([[{
        //         text: "知道了",
        //         callback: function () {
        //             console.log("知道了");
        //         }
        //     }], {
        //         text: "取消",
        //         callback: function () {
        //             console.log("取消");
        //         }
        //     }, {
        //         text: "确定",
        //         callback: function () {
        //             console.log("确定");
        //         }
        //     }]),
        //     show    : function (option) {
        //         this.type(this.types[option.type || "info"]);
        //         this.title(option.title || "系统消息");
        //         this.content(option.message);
        //
        //         // 如果用户没有定义回调函数
        //         if (typeof option.actions == "undefined") {
        //             if (["info", "success", "error"].indexOf(this.type()) != -1) {
        //
        //             }
        //         }
        //
        //         // 用户自定义事件
        //         if (typeof option.actions == "function") {
        //
        //         }
        //         // 用户自定义事件列表
        //         if (option.actions instanceof Array) {
        //
        //         }
        //
        //         $("#__message__").modal({
        //             allowMultiple: true
        //         }).modal("show");
        //     }
        // };

        return self;
    };
});
