const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        
    },
}); //username and password are added by passport-local-mongoose automatically
userSchema.plugin(passportLocalMongoose);//automatically store username hashing salting password
module.exports = mongoose.model("User", userSchema);