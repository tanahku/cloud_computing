const express = require("express");
const router = express.Router();
const userHandler = require("./handlers/users");

// Get all users data
router.get("/", userHandler.getAllUsers);
router.post("/", userHandler.createUser);

module.exports = router;
