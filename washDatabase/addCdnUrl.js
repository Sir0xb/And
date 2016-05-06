/*
该脚本用于清洗数据库，非创建人员请勿执行
清洗resource中的cdn和devUrl这两个字段
*/
var config = require("../config/config");

var mongo = require("mongodb");
var host = config.mongoInfo.url;
var port = config.mongoInfo.port;
var server = mongo.Server(host,port,{auto_reconnect:true});
var db = new mongo.Db(config.mongoInfo.db, server, {safe:true});


var cdnPrefix = 'http://cdn-static-shared.test.17zuoye.net/s17/';

db.open(function (err,db) {
    db.collection("resources", function (err,collection) {
        if(err) throw err;
        else{
            collection.find({}).forEach(function(doc){
                var title = doc.title;
                doc.versionPackage.forEach(function(pkg){
                    var version = pkg.version;
                    pkg.files.forEach(function(file){
                        var name = file.name;
                        file.devUrl = 'lib/' + title + '/' + version + '/' + 'dist/' + name;
                        file.cdn = cdnPrefix + file.devUrl;
                    });
                });
                console.log(doc)
                collection.save(doc);
            });
        }
        
    });
});