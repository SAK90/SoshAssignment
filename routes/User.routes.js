const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User.controller.js");
const Authorize = require("../middleware/Authorize.js");

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);
router.put("/logout", Authorize, UserController.Logout);

module.exports = router;
