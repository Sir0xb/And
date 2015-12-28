define(["knockout", "jquery"], function (ko, $) {
    return function (context) {
        var self = this;

        self.parent = context.parent;
        self.data = context.data;

        // 会议室列表
        self.rooms = ko.observableArray([]);
        // 查询会议室
        function searchRoomList(level) {
            $.post("/crooms/load:" + level, function (data) {
                console.log(data);
            });
        }

        self.parent.loading(false);

        if (self.parent.debug) {
            crooms = self;
        }
    };
});
