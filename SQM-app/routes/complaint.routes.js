const express = require("express")
const complaintRouter = express.Router()
const {
  getCreateComplaint,
  postCreateComplaint,
  getDetailsComplaint,
  postUpdateComplaint
} = require("../controllers/complaint.controller")


/* Middleware */
const isLoggedIn = require("../middleware/isLoggedIn")
const isLoggedOut = require("../middleware/isLoggedOut")
const logStatus = require("../middleware/logStatus")
const fileUploader = require("../config/cloudinary.config")

/* Create */
complaintRouter.get("/create", logStatus, isLoggedIn, getCreateComplaint)
complaintRouter.post("/create", fileUploader.single("problemImg"), postCreateComplaint)
// fileUploader.single() returns a link inside req.file.path

/* Read */
complaintRouter.get('/:complaintId/details', logStatus, isLoggedIn, getDetailsComplaint)

/* Update */
complaintRouter.post('/:complaintId/update', fileUploader.single('problemImg'), postUpdateComplaint)

module.exports = complaintRouter
