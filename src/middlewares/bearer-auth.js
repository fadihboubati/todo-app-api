const UserModer = require("../models/user.model");

require("dotenv").config();
const DEVMODE = process.env.DEVMODE;

module.exports = async function (req, res, next) {
    try {

        if (!req.headers.authorization) {
            next("No Authorization info, username and password are required");
            return;
        }

        let basicHeaderParts = req.headers.authorization.split(' ');
        let token = basicHeaderParts[1];

        UserModer.authenticateToken(token, next)
            .then(userInfo => {
                req.user = userInfo
                next();
            })

    } catch (error) {
        next(DEVMODE ? error.message : "Ops, Somethig wrong during singing up proccess");
        return;
    }
}