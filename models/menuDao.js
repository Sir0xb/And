var mongodb = require("../config/mongodb");

var Schema = mongodb.mongoose.Schema;
var MenuSchema = new Schema({
    menuId      : String,
    menuName    : String,
    level       : Number,
    link        : String,
    desc        : String,
    subMenu     : Array
});

var Menu = mongodb.mongoose.model("Menu", MenuSchema);

var MenuDao = function () {};

MenuDao.prototype.save = function (obj, callback) {
    var instance = new Menu(obj);
    instance.save(function (err) {
        callback(err);
    });
};

MenuDao.prototype.findByName = function (name, callback) {
    Menu.findOne({ name: name }, function (err, obj) {
        callback(err, obj);
    });
};

module.exports = new MenuDao();
