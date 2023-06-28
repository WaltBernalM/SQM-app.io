// const express = require("express")
// const reportRouter = express.Router()
// const {
//   getCreateReport,
//   postCreateReport,
//   getViewReport,
//   getEditReport,
//   postEditReport,
// } = require("../controllers/report.controller")

// const isLoggedIn = require("../middleware/isLoggedIn")
// const isLoggedOut = require("../middleware/isLoggedOut")
// const isMainUser = require("../middleware/isMainUser")

// /* Create  Report */
// reportRouter.get("/create", isLoggedIn, isMainUser, getCreateReport)
// reportRouter.post("/create", isMainUser, postCreateReport)

// /* View Report */
// reportRouter.get("/:reportId", isLoggedIn, isMainUser, getViewReport)

// /* Edit Report */
// reportRouter.get(`/edit/:reportId`, isLoggedIn, isMainUser, getEditReport)
// reportRouter.post(`/edit/:reportId`, isLoggedIn, isMainUser, postEditReport)

// module.exports = reportRouter
