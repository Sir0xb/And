module.exports = function(app) {
    app.post("/users", function(req, res) {
        res.contentType('json');
        res.send(JSON.stringify({
            status: "success"
        }));
        res.end();
    });
};
