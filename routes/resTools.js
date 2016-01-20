function pageJump(req, res, next, path, title, appName, params) {
    var success = req.flash("success");
    var warning = req.flash("warning");
    var error   = req.flash("error");
    var message = {
        success : success.length ? success : null,
        warning : warning.length ? warning : null,
        error   : error.length ? error : null
    };

    console.log(message);

    params = params || {};
    params.test = true;

    res.render(req.query.unitTest ? "viewport/unitTest.html" : path, {
        user    : req.session.user,
        message : message,
        title   : req.query.unitTest ? "接口测试" : title,
        appName : appName,
        showTest: !!req.query.unitTest,
        params  : params
    });
}
module.exports = {
    pageJump : pageJump
};
