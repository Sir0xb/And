module.exports = function(app) {
    

    app.post("/upload", function (req, res, next) {

        res.json({
            success: true,
            message: {
                name: 'tasdfsdf',
                url: 'http://www.17zuoye.com'
            }
        });

    });
};
