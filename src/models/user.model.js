'use strict';

require("dotenv").config();
const DEVMODE = process.env.DEVMODE;

const mongoose = require("mongoose");
var jwt = require('jsonwebtoken');


const opts = { toJSON: { virtuals: true } };

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

    // salt: {
    //     type: String,
    //     unique: true,
    // }
}, opts)

UserSchema.virtual('token').get(function () {
    const PRIVATEKEY = process.env.PRIVATEKEY;
    var token = jwt.sign({ username: this.username, password: this.password }, PRIVATEKEY);
    return token;
});


const UserModer = mongoose.model("user", UserSchema);


UserModer.authenticateToken = async function (token, next) {
    try {

        // 1. first, check if the token is valid
        // This will raise an error if its not
        const parsedToken = jwt.verify(token, process.env.PRIVATEKEY); // raise an error if not verify

        // 2. second, check if we have a username with the same one that the token handle it
        const user = await this.findOne({ username: parsedToken.username });
        if (user) {
            return;
        } else {
            next("invalid token or user");
        }

    } catch (error) {
        next(error.message);
        return;
        // throw new Error(DEVMODE ? error.message : "Ops, Somethig wrong during singing up proccess");
        // console.log("Ops, Somethig wrong during singing up proccess");
        // throw new Error(error.message);
    }
}

module.exports = UserModer