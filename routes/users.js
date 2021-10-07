const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const verifyToken = require("../middlewares/verifyToken");
const { validateSignup, validateLogin } = require("../middlewares/validateUsers");

router.get("/authCheck", verifyToken, usersController.authCheck);
router.post("/signup", validateSignup(), usersController.signup);
router.post("/login", validateLogin(), usersController.login);

module.exports = router;
