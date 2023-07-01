const express = require("express")
const reportRouter = express.Router()
const {
  getReportDetails,
  postReportUpdate,
} = require("../controllers/report.controller")

const {
  postCreateAction
} = require("../controllers/action.controller")

const isLoggedIn = require("../middleware/isLoggedIn")
const isLoggedOut = require("../middleware/isLoggedOut")
const isMainUser = require("../middleware/isMainUser")
const isUser = require("../middleware/isUser")
const logStatus = require("../middleware/logStatus")

/* View Report details */
reportRouter.get(`/:reportId/details`, isLoggedIn, logStatus, getReportDetails)

reportRouter.post(`/:reportId/update`, isLoggedIn, isUser, postReportUpdate)

// Action Routes from Report
reportRouter.post(
  `/:reportId/action/create`,
  isLoggedIn,
  isUser,
  postCreateAction
)


module.exports = reportRouter