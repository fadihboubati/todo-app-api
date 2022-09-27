require("dotenv").config();
const DEVMODE = process.env.DEVMODE;
const bearerAuth = require("../middlewares/bearer-auth");
const acl = require("../middlewares/acl");

const express = require("express");
const router = express.Router();


router.get("/", bearerAuth, acl("read"), async (req, res, next) => {
    try {
        console.log("get Passed");
    } catch (error) {
        next(DEVMODE ? error.message : "Ops, Somethig wrong during singing up proccess");
    }
})

router.get("/:id", bearerAuth, acl("read"), async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("get Passed");
    } catch (error) {
        next(DEVMODE ? error.message : "Ops, Somethig wrong during singing up proccess");
    }
})

router.post("/", bearerAuth, acl("create"), async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("post Passed");
    } catch (error) {
        next(DEVMODE ? error.message : "Ops, Somethig wrong during singing up proccess");
    }
})

router.put("/:id", bearerAuth, acl("update"), async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("put Passed");
    } catch (error) {
        next(DEVMODE ? error.message : "Ops, Somethig wrong during singing up proccess");
    }
})

router.delete("/:id", bearerAuth, acl("delete"), async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("delete Passed");
    } catch (error) {
        next(DEVMODE ? error.message : "Ops, Somethig wrong during singing up proccess");
    }
})

module.exports = router;