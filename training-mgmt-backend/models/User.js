const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    registration_date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        required: true,
    }

});

module.exports = User = mongoose.model("user", UserSchema);