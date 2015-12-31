var Tools = require("./resTools");

module.exports = function (app) {
    app.get("/signup", function (req, res, next) {
        Tools.pageJump(req, res, next, "index.html", "注册", "signup", {
            test: true
        });
    });

    app.post("/signup", function (req, res, next) {
        
    });
};
