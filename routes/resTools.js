function pageJump(req, res, next, path, title, appName, params) {
    res.render(req.query.unitTest ? "viewport/unitTest.html" : path, {
        user    : req.session.user,
        success : req.flash("success").toString(),
        warning : req.flash("warning").toString(),
        error   : req.flash("error").toString(),
        title   : req.query.unitTest ? "接口测试" : title,
        appName : appName,
        showTest: !!req.query.unitTest,
        params  : params
    });
}
module.exports = {
    pageJump : pageJump
};
