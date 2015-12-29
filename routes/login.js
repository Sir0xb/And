module.exports = function(app) {
    app.get("/login", function (req, res, next) {
        
    });

    app.post("/menus/load", function(req, res, next) {
        var Menu = mongoose.model("Menu");
    });
};
