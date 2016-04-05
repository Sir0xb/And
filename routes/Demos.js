var Tools = require("./resTools");

module.exports = function(app) {
    app.get("/demos", function (req, res, next) {
        Tools.log('Demos', 'get', 'demos', '测试页面', 'demos');
        Tools.pageJump(req, res, next, "index.html", "培训内容", "demos");
    });
};
