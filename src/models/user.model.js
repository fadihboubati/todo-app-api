'use strict';
const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: {
        required: true,
        unique: true,
        type: String
        // allowNull: false
    },

    password: {
        type: String,
        required: true

    }
})


const UserModer = mongoose.model("user", UserSchema);

module.exports = UserModer