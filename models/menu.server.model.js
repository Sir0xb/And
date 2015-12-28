var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var MenuSchema = new Schema({
    menuId      : String,
    menuName    : String,
    level       : Number,
    link        : String,
    desc        : String,
    subMenu     : Array
});

mongoose.model("Menu", MenuSchema, "menu");
