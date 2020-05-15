const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    dob: Date,
    phone: Number,
    password: String
});

module.exports = mongoose.model("User",userSchema);