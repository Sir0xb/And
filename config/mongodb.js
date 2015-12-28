var mongoose = require("mongoose");
var config = require("./config");

module.exports = function () {
    mongoose.connection.on("connecting", function () {
        console.log('Connecting to MongoDB...');
    });
    mongoose.connection.on("error", function (error) {
        console.log('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
    });
    mongoose.connection.once('open', function() {
        console.log('MongoDB connection opened!');
    });
    mongoose.connection.on('reconnected', function () {
        console.log('MongoDB reconnected!');
    });
    mongoose.connection.on('disconnected', function() {
        console.log('MongoDB disconnected!');
        mongoose.connect(dbURI, {
            server: {
                auto_reconnect: true
            }
        });
    });

    var db = mongoose.connect(config.mongodb, {
        server: {
            auto_reconnect: true
        }
    });

    require("../models/user.server.model");
    require("../models/menu.server.model");

    return db;
};
