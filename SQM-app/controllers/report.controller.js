// @ts-ignore
const User = require("../models/User.model")
// @ts-ignore
const Main = require("../models/Main.model")
// @ts-ignore
const Complaint = require("../models/Complaint.model")
const Report = require("../models/Report.model")
// @ts-ignore
const mongoose = require("mongoose")

// @ts-ignore
const getReport = async (req, res, next) => {
  const { main: isMain } = req.session.currentUser

  if (!isMain) {
    const { _id: userId } = req.session.currentUser
    const { reportId } = req.params

    const report = await Report.findById(reportId)

    if (report?.userId?.toJSON() !== userId) {
      return res.redirect("/auth/profile")
    }
    
    // @ts-ignore
    const { d3, d4, d5d6, d7 } = report

    // @ts-ignore
    const { teamMembers, w5h2, subTime, attachments, approval, appTime } = d3

    console.log(report)

    res.render("report/report", {
      userInSession: req.session.currentUser,
      report,
    })
  }
}
// @ts-ignore
const postReport = async (req, res, next) => { 
  
}

module.exports = {
  getReport,
  postReport,
}