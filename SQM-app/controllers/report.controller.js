// @ts-ignore
const User = require("../models/User.model")
// @ts-ignore
const Main = require("../models/Main.model")
// @ts-ignore
const Complaint = require("../models/Complaint.model")
const Report = require("../models/Report.model")
// @ts-ignore
const mongoose = require("mongoose")
const { report } = require("../app")

const getReportDetails = async (req, res, next) => {
  const { main: isMain } = req.session.currentUser

  if (!isMain) {
    const { _id: userId } = req.session.currentUser
    const { reportId } = req.params

    const complaint = await Complaint.find({ report: reportId }).populate({
      path: "report",
      populate: [
        { path: "actionsD3" },
        { path: "actionsD5D6" },
        { path: "actionsD7" },
      ],
    })

    const { report } = complaint[0]

    // @ts-ignore
    const { d3, actionsD3, d4, d5d6, actionsD5D6, d7, actionsD7, approval } =
      report
    const {
      teamMembers,
      w5h2,
      attachments: d3Attachments,
      approval: d3Approval,
    } = d3
    const {
      whyDet,
      whyOcc,
      rootCauseDet,
      rootCauseOcc,
      attachments: d4Attachments,
      approval: d4Approval,
    } = d4
    const { attachments: d4d5Attachments, d5d6approval: d5d6Approval } = d5d6
    const { attachments: d7Attachments, d5d6approval: d7Approval } = d7

    res.render("report/report", {
      userInSession: req.session.currentUser,
      report,
      reportId,
    })
  } else {
    
  }
}

const postReportUpdate = async (req, res, next) => {
  const { reportId } = req.params
  const report = await Report.findById(reportId)

  // d3 update values
  let { member0, member1, member2, member3, w0, w1, w2, w3, w4, w5, w6, d3Attachment } = req.body
  
  report?.d3.teamMembers[0] !== null ? (member0 = report?.d3.teamMembers[0]) : void 0
  report?.d3.teamMembers[1] !== null ? (member1 = report?.d3.teamMembers[1]) : void 0
  report?.d3.teamMembers[2] !== null ? (member2 = report?.d3.teamMembers[2]) : void 0
  report?.d3.teamMembers[3] !== null ? (member3 = report?.d3.teamMembers[3]) : void 0
  let teamMembers = Array(member0, member1, member2, member3)

  report?.d3.w5h2[0] !== null ? (w0 = report?.d3.w5h2[0]) : void 0
  report?.d3.w5h2[1] !== null ? (w1 = report?.d3.w5h2[1]) : void 0
  report?.d3.w5h2[2] !== null ? (w2 = report?.d3.w5h2[2]) : void 0
  report?.d3.w5h2[3] !== null ? (w3 = report?.d3.w5h2[3]) : void 0
  report?.d3.w5h2[4] !== null ? (w4 = report?.d3.w5h2[4]) : void 0
  report?.d3.w5h2[5] !== null ? (w5 = report?.d3.w5h2[5]) : void 0
  report?.d3.w5h2[6] !== null ? (w6 = report?.d3.w5h2[6]) : void 0
  let w5h2 = Array(w0, w1, w2, w3, w4, w5, w6)

  // d4 update values
  let {
    whyDet0, whyOcc0,
    whyDet1, whyOcc1,
    whyDet2, whyOcc2,
    whyDet3, whyOcc3,
    whyDet4, whyOcc4,
    rootCauseDet, rootCauseOcc,
    d4Attachment
  } = req.body

  report?.d4.whyDet[0] !== null ? (whyDet0 = report?.d4.whyDet[0]) : void 0
  report?.d4.whyDet[1] !== null ? (whyDet1 = report?.d4.whyDet[1]) : void 0
  report?.d4.whyDet[2] !== null ? (whyDet2 = report?.d4.whyDet[2]) : void 0
  report?.d4.whyDet[3] !== null ? (whyDet3 = report?.d4.whyDet[3]) : void 0
  report?.d4.whyDet[4] !== null ? (whyDet4 = report?.d4.whyDet[4]) : void 0
  let whyDet = Array(whyDet0, whyDet1, whyDet2, whyDet3, whyDet4)

  report?.d4.whyOcc[0] !== null ? (whyOcc0 = report?.d4.whyOcc[0]) : void 0
  report?.d4.whyOcc[1] !== null ? (whyOcc1 = report?.d4.whyOcc[1]) : void 0
  report?.d4.whyOcc[2] !== null ? (whyOcc2 = report?.d4.whyOcc[2]) : void 0
  report?.d4.whyOcc[3] !== null ? (whyOcc3 = report?.d4.whyOcc[3]) : void 0
  report?.d4.whyOcc[4] !== null ? (whyOcc4 = report?.d4.whyOcc[4]) : void 0
  let whyOcc = Array(whyOcc0, whyOcc1, whyOcc2, whyOcc3, whyOcc4)

  // d5d6 values
  let { d5d6Attachment } = req.body

  // d7 values
  let { d7Attachment } = req.body

  // Update of Report
  const updatedReport = await Report.findByIdAndUpdate(reportId, {
    'd3.teamMembers': teamMembers,
    'd3.w5h2': w5h2,
    'd3.attachment': d3Attachment,
    'd4.whyDet': whyDet,
    'd4.whyOcc': whyOcc,
    'd4.rootCauseDet': rootCauseDet,
    'd4.rootCauseOcc': rootCauseOcc,
    'd4.attachment': d4Attachment,
    'd5d6.attachment': d5d6Attachment,
    'd7.attachment': d7Attachment
    },
    { new: true }
  )

  console.log(
    `D${req.body.submissionD} was updated at ${updatedReport?.updatedAt}`
  )

  res.redirect(`/report/${reportId}/details`)
}

module.exports = {
  getReportDetails,
  postReportUpdate,
}