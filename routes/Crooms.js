module.exports = function(app) {
    app.post("/crooms/load:level", function(req, res) {
        res.contentType('json');
        res.send(JSON.stringify({
            status: "success",
            data: [
                {}
            ]
        }));
        res.end();
    });
};
