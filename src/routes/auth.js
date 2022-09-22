const express = require("express");
const router = express.Router();

require("dotenv").config();
const DEVMODE = process.env.DEVMODE;

const bcrypt = require('bcrypt');
const { userModel } = require("../models/index");

const basicAuth = require("../middlewares/basic-auth")
const bearerAuth = require("../middlewares/bearer-auth")


router.post('/signin', basicAuth, async (req, res) => {
    const userInfo = req.user
    res.status(200).send(userInfo)
});

router.post('/signup', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const saltRounds = 10 // by default, "the cost-factor"
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        // hashedPassword = salt +  password_after_hashing
        // salt: '$2b$10$gyzZxvQWP6/fxpDeLQrwzu',
        // password: '$2b$10$gyzZxvQWP6/fxpDeLQrwzuTo3rsYi0PCv31njq2N5XJfiR87YXwDa',
        // res: https://stackoverflow.com/questions/20394137/yii-cpasswordhelper-hashpassword-and-verifypassword/20399775#20399775

        const existingUser = await userModel.findOne({ username });
        if (existingUser) return res.status(403).send("User already exist");

        const user = new userModel({ username, password: hashedPassword });

        await user.save();
        res.status(200).json({
            user: {
                _id: user._id,
                username: user.username
            },
            token: user.token
        });

    } catch (error) {
        next(DEVMODE ? error.message : "Ops, Somethig wrong during singing up proccess");
    }
});

router.post("/testb", bearerAuth, (req, res) => {
    res.status(200).send("You are still welcome")
})

module.exports = router;