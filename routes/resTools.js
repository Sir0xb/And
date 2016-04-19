function pageJump(req, res, next, path, title, appName, params) {
    var MenuDao = require("../models/menuDao");
    var UserDao = require("../models/userDao");

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

    UserDao.findByName(req.session.user, function(err, userdata){
        MenuDao.findAll(function (err, obj) {
            res.render(req.query.unitTest ? "viewport/unitTest.html" : path, {
                user    : req.session.user,
                currentUser: userdata,
                menus   : obj[0].subMenu || [],
                message : message,
                title   : req.query.unitTest ? "接口测试" : title,
                appName : appName,
                compress: ['localhost', '127.0.0.1'].indexOf(req.hostname) != -1 ? false : true,
                showTest: !!req.query.unitTest,
                params  : params
            });
        });
    });
    
}

function log(from, type, url, status, to) {
    console.log(from + ': (type)' + type.toUpperCase() + '; (url)/' + url + '; (status)' + status + '; (to)' + (to || '未定') + ';');
}

module.exports = {
    pageJump : pageJump,
    log      : log
};
