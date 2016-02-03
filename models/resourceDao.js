var mongodb = require("../config/mongodb");

var Schema = mongodb.mongoose.Schema;
var ResourceSchema = new Schema({
    id: String,
    title: String,  //资源名称
    type: Number, //资源列表，1:pc端, 2:移动端
    description: String,  //简介
    useMethod: String, //使用方法，使用markdown编写，支持图文
    demoUrls: Array, //demo地址
    siteUrl: String, //官网地址
    owner: String,  //维护者
    ownerQQ: String,  //维护者QQ
    comment: String  //备注
    lastModified: String, //上次修改时间
    versionPackage: [
        {           
            version: String, //版本号
            files: [
                {
                    name: String, //文件名称
                    devUrl: String, //开发环境地址
                    cdn: String, //线上cdn地址
                }
            ]
        }
    ]
});

var Resource = mongodb.mongoose.model("Resource", ResourceSchema);

var ResourceDao = function () {};

Resource.prototype.save = function (obj, callback) {
    var instance = new Resource(obj);
    instance.save(function (err) {
        callback(err);
    });
};

Resource.prototype.updateById = function (menuId, callback) {
    Menu.update({ menuId: menuId }, function (err) {
        callback(err);
    });
};

Resource.prototype.findById = function (menuId, callback) {
    Menu.findOne({ menuId: menuId }, function (err, obj) {
        callback(err, obj);
    });
};

Resource.prototype.findAll = function (callback) {
    Menu.find({}, function (err, obj) {
        callback(err, obj);
    });
}

module.exports = new Resource();
