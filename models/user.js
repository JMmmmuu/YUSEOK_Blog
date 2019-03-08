var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    nickname: String,
    password: String,
    date: {type: Date, default: Date.now}
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
