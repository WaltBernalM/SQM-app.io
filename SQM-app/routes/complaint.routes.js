const express = require("express")
const complaintRouter = express.Router()
const {
  getCreateComplaint,
  postCreateComplaint
} = require("../controllers/complaint.controller")

const isLoggedIn = require("../middleware/isLoggedIn")
const isLoggedOut = require("../middleware/isLoggedOut")
const logStatus = require("../middleware/logStatus")
const uploadFile = require("../middleware/uploadFile")

/* Create */
complaintRouter.get("/create", isLoggedIn, logStatus,getCreateComplaint)
complaintRouter.post("/create", uploadFile, postCreateComplaint)


module.exports = complaintRouter
