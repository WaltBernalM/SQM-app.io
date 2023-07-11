const express = require('express');
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn")
const isLoggedOut = require("../middleware/isLoggedOut")
const logStatus = require("../middleware/logStatus")

/* GET home page */
router.get("/", logStatus, (req, res, next) => {
  res.render("index");
});

module.exports = router;
