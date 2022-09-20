'user strict';
require("dotenv").config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL
const server = require("./src/server");


server.start(PORT, DATABASE_URL);