const express = require("express");
const router = express.Router();

router.get('/signin', async (req, res, next) => {
    res.send("Sign in")
});

router.get('/signup', async (req, res, next) => {
    res.send("Sign up")
});

module.exports = router