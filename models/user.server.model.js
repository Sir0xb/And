var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    userId      : Number,
    userName    : String,
    level       : Number,
    lastLogin   : Date,
    createTime  : Date,
    updateTime  : Date
});

mongoose.model("User", UserSchema, "user");
