const express = require("express");
// const router = require("./users");
const routers = express.Router();

// user routes
routers.use("/", require("./users"));

// student routes
routers.use("/student", require("./students"));

// interview routes
routers.use("/interview", require("./interview"));

module.exports = routers;
