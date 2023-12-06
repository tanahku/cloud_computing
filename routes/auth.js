const express = require("express");
const router = express.Router();
const authHandler = require("./handlers/auth");

router.post("/login", authHandler.login);
router.post("/register", authHandler.register);
router.get("/google", authHandler.linkGoogle);
router.get("/google/callback", authHandler.registerWithGoogle);

module.exports = router;
