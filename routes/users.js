const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const verifyToken = require("../middlewares/verifyToken");
const { validateSignup, validateLogin } = require("../middlewares/validateUsers");
const upload = require("../middlewares/upload");

router.get("/authCheck", verifyToken, usersController.authCheck);
router.post("/signup", upload.fields([{ name: "profileImage" }]), validateSignup(), usersController.signup);
router.post("/login", validateLogin(), usersController.login);
router.post("/logout", verifyToken, usersController.logout);

module.exports = router;
