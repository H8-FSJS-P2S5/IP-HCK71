const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/authentication.js");
const { GadgetController } = require("../controllers/gadgetController.js");

router.post("/register", GadgetController.addUser);
router.post("/login", GadgetController.login);
router.post("/login/google", GadgetController.googleLogin);

module.exports = router;
