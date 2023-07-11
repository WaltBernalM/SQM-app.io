const express = require("express")
const reportRouter = express.Router()
const {
  getReportDetails,
  postReportUpdate,
  postApproveReport,
  getDownloadAttachment,
} = require("../controllers/report.controller")

const {
  postCreateAction
} = require("../controllers/action.controller")

const isLoggedIn = require("../middleware/isLoggedIn")
const isLoggedOut = require("../middleware/isLoggedOut")
const isMainUser = require("../middleware/isMainUser")
const isUser = require("../middleware/isUser")
const logStatus = require("../middleware/logStatus")
const uploadFile = require("../middleware/uploadFile")

/* View Report details by Main and User */
reportRouter.get(`/:reportId/details`, isLoggedIn, logStatus, getReportDetails)

/* Post report update by User */
reportRouter.post(
  `/:reportId/update`,
  uploadFile.fields([
    { name: "d3Attachment", maxCount: 1 },
    { name: "d4Attachment", maxCount: 1 },
    { name: "d5d6Attachment", maxCount: 1 },
    { name: "d7Attachment", maxCount: 1 },
  ]),
  postReportUpdate
)

// Action Routes from Report
reportRouter.post(`/:reportId/action/create`, isLoggedIn, isUser, postCreateAction)

/* Post approve report by Main */
reportRouter.post('/:reportId/approve', isLoggedIn, isMainUser, postApproveReport)

/* Get attachment from Report */
reportRouter.get(
  `/:reportId/attachment/:attachmentName`,
  isLoggedIn,
  getDownloadAttachment
)

module.exports = reportRouter