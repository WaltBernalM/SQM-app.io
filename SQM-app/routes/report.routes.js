const express = require("express")
const reportRouter = express.Router()
const {
  getReport,
  postReport,
} = require("../controllers/report.controller")

const isLoggedIn = require("../middleware/isLoggedIn")
const isLoggedOut = require("../middleware/isLoggedOut")
const isMainUser = require("../middleware/isMainUser")
const logStatus = require("../middleware/logStatus")

// /* View Report */
// reportRouter.get("/:reportId", isLoggedIn, isMainUser, getViewReport)

/* Edit Report */
reportRouter.get(`/:reportId`, isLoggedIn, logStatus, getReport)
reportRouter.post(`/:reportId`, isLoggedIn, isMainUser, postReport)

module.exports = reportRouter
