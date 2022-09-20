const express = require("express");
const app = express();

const mongoose = require("mongoose");

const handle404Error = require("./error-handlers/404");
const handle500Error = require("./error-handlers/500");
const authRoutes = require("./routes/auth");

async function start(port, database_url) {
    await mongoose.createConnection(database_url).asPromise();
    app.listen(port, () => console.log(`Running on PORT: ${port}`));
}

app.get("/", handleWelcomePage);

function handleWelcomePage(req, res) {
    res.status(200).send("Welcome to the to-do-app api")
}

app.use("/auth", authRoutes);

app.use(handle404Error);
app.use(handle500Error);

module.exports = {
    start
}
