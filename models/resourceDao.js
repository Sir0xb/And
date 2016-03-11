var mongodb = require("../config/mongodb");
var moment = require("moment");

var Schema = mongodb.mongoose.Schema;
var ResourceSchema = new Schema({
    id: String,
    title: String,  //资源名称
    type: Number, //资源类型，1:pc端, 2:移动端
    description: String,  //简介
    useMethod: String, //使用方法，使用markdown编写，支持图文
    demoUrls: Array, //demo地址
    siteUrl: String, //官网地址
    owner: String,  //维护者
    ownerQQ: String,  //维护者QQ
    comment: String,  //备注
    lastModified: {type: String, default: moment().format('YYYY-MM-DD hh:mm:ss')}, //上次修改时间
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

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 1 }
});

var Counter = mongodb.mongoose.model("Counter", CounterSchema);

//实现save的时候id自增
ResourceSchema.pre('save', function(next) {
    var doc = this;
    Counter.findByIdAndUpdate({_id: 'resourceid'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.id = counter.seq;
        next();
    });
});

ResourceSchema.set('toObject', { getters: true });


var ResourceDao = function () {};

ResourceDao.prototype.save = function (obj, callback) {
    var instance = new Resource(obj);

    instance.save(function (err) {
        callback(err);
    });
};

ResourceDao.prototype.updateById = function (obj, callback) {
    var instance = new Resource(obj);
    instance.set('lastModified', moment().format('YYYY-MM-DD hh:mm:ss'));
    console.log(instance)
    instance.update(instance, function (err) {
        callback(err);
    });
};

ResourceDao.prototype.findById = function (id, callback) {
    Resource.findOne({ id: id }, function (err, obj) {
        callback(err, obj);
    });
};

ResourceDao.prototype.list = function (callback) {
    Resource.find({}, function (err, obj) {
        callback(err, obj);
    });
}

ResourceDao.prototype.remove = function(id, callback){
    Resource.remove({id: id}, function(err){
        callback(err, null);
    });
}

module.exports = new ResourceDao();
