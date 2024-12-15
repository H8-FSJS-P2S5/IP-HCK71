const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/authentication.js");

router.get("/", (req, res) => {
  res.json({ message: "Hello Joufando!" });
});

router.use(require("./auth.js"));
router.use(authentication);
router.use(require("./gadget.js"));

module.exports = router;
