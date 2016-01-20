var mongodb = require("../config/mongodb");

var Schema = mongodb.mongoose.Schema;
var UserSchema = new Schema({
    username    : String,
    password    : String,
    level       : {
        type    : String,
        default : "7"
    },
    create_date : {
        type    : Date,
        default : Date.now
    },
    update_date : {
        type    : Date,
        default : Date.now
    }
});

var User = mongodb.mongoose.model("User", UserSchema);

var UserDao = function () {};

UserDao.prototype.save = function (obj, callback) {
    var instance = new User(obj);
    instance.save(function (err) {
        callback(err);
    });
};

UserDao.prototype.findByName = function (username, callback) {
    User.findOne({ username: username }, function (err, obj) {
        callback(err, obj);
    });
};

module.exports = new UserDao();
