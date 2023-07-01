// @ts-ignore
const User = require("../models/User.model")
// @ts-ignore
const Main = require("../models/Main.model")
// @ts-ignore
const Complaint = require("../models/Complaint.model")
const Report = require("../models/Report.model")
// @ts-ignore
const mongoose = require("mongoose")

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

  // d3 update values
  const { member0, member1, member2, member3, w0, w1, w2, w3, w4, w5, w6, attachment } = req.body

  const teamMembers = Array(member0, member1, member2, member3)
  const w5h2 = Array(w0, w1, w2, w3, w4, w5, w6)

  const updatedReport = await Report.findByIdAndUpdate(reportId, {
      'd3.teamMembers': teamMembers,
      'd3.w5h2': w5h2,
    },
    { new: true }
  )

  console.log(updatedReport)

  res.redirect(`/report/${reportId}/details`)
}

module.exports = {
  getReportDetails,
  postReportUpdate,
}