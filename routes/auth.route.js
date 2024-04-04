const express = require("express");
var router = express.Router();

const authController = require("../controllers/auth/auth.controller");
const middlewareAuthenticateToken = require("../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/get-me", middlewareAuthenticateToken, authController.getMe);

module.exports = router;
