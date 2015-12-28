define(["knockout", "semantic", "ko-mapping"], function (ko) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;
        self.loading = ko.observable(false);
        self.palette = ko.observable({});

        // self.msg = self.parent.msg || {
        //     // 消息初始化函数，内部自动调用，一般不用手动调用
        //     reset: function () {
        //         $('#msg_modal').modal('hide');
        //         self.msg.content('');
        //         self.msg._cancle = function () { };
        //         self.msg._confirm = function () { };
        //     },
        //     // 消息内容，可动态修改内容，实时消息更新
        //     content: ko.observable(''),
        //     // 取消处理函数
        //     cancle : function () {
        //         self.msg._cancle();
        //         self.msg.reset();
        //     },
        //     // 用户提供取消回调函数
        //     _cancle: function () { },
        //     // 确定处理函数
        //     confirm: function () {
        //         self.msg._confirm();
        //         self.msg.reset();
        //     },
        //     // 用户提供确定回调函数
        //     _confirm: function () { },
        //     // 初始化函数
        //     init: function (msg, confirm, cancle) {
        //         self.msg.content(msg);
        //         self.msg._confirm = confirm || function () { };
        //         self.msg._cancle = cancle || function () { };
        //         $('#msg_modal').modal('show');
        //     }
        // };

        return self;
    };
});
