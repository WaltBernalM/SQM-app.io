// @ts-nocheck
// const User = require("../models/User.model")
// const Main = require("../models/Main.model")
// const mongoose = require("mongoose")
// const { report } = require("../app")
// const { Binary } = require("bson")
const Complaint = require("../models/Complaint.model")
const Report = require("../models/Report.model")
const getContentType = require("../utils/getContentType")

const getReportDetails = async (req, res, next) => {
  try {
    const { reportId } = req.params

    const complaint = await Complaint.findOne({ report: reportId }).populate({
      path: "report",
      populate: [
        { path: "actionsD3" },
        { path: "actionsD5D6" },
        { path: "actionsD7" },
      ],
    })

    const { report } = complaint

    const { d3, d4, actionsD3, actionsD5D6, actionsD7 } = report

    const teamMembers = d3.teamMembers.reduce((acc, val) => {return acc + val}, '')
    const w5h2 = d3.w5h2.reduce((acc, val) => {return acc + val}, '')
    
    const whyDet = d4.whyDet.reduce((acc, val) => {acc + val}, '')
    const whyOcc = d4.whyOcc.reduce((acc, val) => {acc + val}, '')
    const rootCauseDet = d4.rootCauseDet
    const rootCauseOcc = d4.rootCauseOcc

    let d3Step, d4Step, d5Step, d7Step, d8Step

    if ((!teamMembers && !w5h2) || actionsD3.length < 1) {
      d3Step = true
    } else if (!whyDet && !whyOcc && !rootCauseDet && !rootCauseOcc) {
      d3Step = true
      d4Step = true
    } else if (actionsD5D6.length < 1) { 
      d3Step = true
      d4Step = true
      d5Step = true
    } else if (actionsD7.length < 1) {
      d3Step = true
      d4Step = true
      d5Step = true
      d7Step = true
    } else {
      d3Step = true
      d4Step = true
      d5Step = true
      d7Step = true
      d8Step = true
    }

    res.render("report/report", {
      userInSession: req.session.currentUser,
      report,
      complaint,
      d3Step, d4Step, d5Step, d7Step
    })
  } catch (error) {
    next(error)
  }
}

const postReportUpdate = async (req, res, next) => {
  try {
    const { reportId } = req.params
    const report = await Report.findById(reportId)

    // d3 update values
    let {
      member0,
      member1,
      member2,
      member3,
      w0,
      w1,
      w2,
      w3,
      w4,
      w5,
      w6,
    } = req.body
    if (report.d3.teamMembers[0] !== null && !member0)
      member0 = report.d3.teamMembers[0]
    if (report.d3.teamMembers[1] !== null && !member1)
      member1 = report.d3.teamMembers[1]
    if (report.d3.teamMembers[2] !== null && !member2)
      member2 = report.d3.teamMembers[2]
    if (report.d3.teamMembers[3] !== null && !member3)
      member3 = report.d3.teamMembers[3]
    let teamMembers = Array(member0, member1, member2, member3)

    if (report.d3.w5h2[0] !== null && !w0) w0 = report.d3.w5h2[0]
    if (report.d3.w5h2[1] !== null && !w1) w1 = report.d3.w5h2[1]
    if (report.d3.w5h2[2] !== null && !w2) w2 = report.d3.w5h2[2]
    if (report.d3.w5h2[3] !== null && !w3) w3 = report.d3.w5h2[3]
    if (report.d3.w5h2[4] !== null && !w4) w4 = report.d3.w5h2[4]
    if (report.d3.w5h2[5] !== null && !w5) w5 = report.d3.w5h2[5]
    if (report.d3.w5h2[6] !== null && !w6) w6 = report.d3.w5h2[6]
    let w5h2 = Array(w0, w1, w2, w3, w4, w5, w6)

    // if (!member0 || !member1 || !member2 || !member3 || !w0 || !w1 || !w2 || !w3 || !w4 || !w5 || !w6) {
    //   return res.redirect(`/report/${reportId}/details`)
    // }

    // d4 update values
    let {
      whyDet0,
      whyOcc0,
      whyDet1,
      whyOcc1,
      whyDet2,
      whyOcc2,
      whyDet3,
      whyOcc3,
      whyDet4,
      whyOcc4,
      rootCauseDet,
      rootCauseOcc,
    } = req.body

    if (report.d4.whyDet[0] !== null && !whyDet0)
      whyDet0 = report.d4.whyDet[0]
    if (report.d4.whyDet[1] !== null && !whyDet1)
      whyDet1 = report.d4.whyDet[1]
    if (report.d4.whyDet[2] !== null && !whyDet2)
      whyDet2 = report.d4.whyDet[2]
    if (report.d4.whyDet[3] !== null && !whyDet3)
      whyDet3 = report.d4.whyDet[3]
    if (report.d4.whyDet[4] !== null && !whyDet4)
      whyDet4 = report.d4.whyDet[4]
    let whyDet = Array(whyDet0, whyDet1, whyDet2, whyDet3, whyDet4)

    if (report.d4.whyOcc[0] !== null && !whyOcc0)
      whyOcc0 = report.d4.whyOcc[0]
    if (report.d4.whyOcc[1] !== null && !whyOcc1)
      whyOcc1 = report.d4.whyOcc[1]
    if (report.d4.whyOcc[2] !== null && !whyOcc2)
      whyOcc2 = report.d4.whyOcc[2]
    if (report.d4.whyOcc[3] !== null && !whyOcc3)
      whyOcc3 = report.d4.whyOcc[3]
    if (report.d4.whyOcc[4] !== null && !whyOcc4)
      whyOcc4 = report.d4.whyOcc[4]
    let whyOcc = Array(whyOcc0, whyOcc1, whyOcc2, whyOcc3, whyOcc4)

    if (report.d4.rootCauseDet != null && !rootCauseDet)
      rootCauseDet = report.d4.rootCauseDet
    if (report.d4.rootCauseOcc != null && !rootCauseOcc)
      rootCauseOcc = report.d4.rootCauseOcc

    // if (!whyDet0 || !whyDet1 || !whyDet2 || !whyOcc0 || !whyOcc1 || !whyOcc2 || !rootCauseDet || !rootCauseOcc) {
    //   return res.redirect(`/report/${reportId}/details`)
    // }

    // Attachment upload
    let d3Attachment = null, d4Attachment = null, d5d6Attachment = null, d7Attachment = null
    if (req.files) {
      console.log(req.files)
      if (req.files.d3Attachment) {
        const d3File = req.files.d3Attachment[0];
        d3Attachment = {
          filename: d3File.originalname,
          data: d3File.buffer,
        }
        d3File.buffer = Buffer.alloc(0)
      } else {
        d3Attachment = report.d3.attachment
      }

      if (req.files.d4Attachment) {
        const d4File = req.files.d4Attachment[0]
        d4Attachment = {
          filename: d4File.originalname,
          data: d4File.buffer,
        }
        d4File.buffer = Buffer.alloc(0)
      } else {
        d4Attachment = report.d4.attachment
      }
      
      if (req.files.d5d6Attachment) {
        const d5d6File = req.files.d5d6Attachment[0]
        d5d6Attachment = {
          filename: d5d6File.originalname,
          data: d5d6File.buffer,
        }
        d5d6File.buffer = Buffer.alloc(0)
      } else {
        d5d6Attachment = report.d5d6.attachment
      }

      if (req.files.d7Attachment) {
        const d7File = req.files.d7Attachment[0]
        d7Attachment = {
          filename: d7File.originalname,
          data: d7File.buffer,
        }
        d7File.buffer = Buffer.alloc(0)
      } else {
        d7Attachment = report.d7.attachment
      } 
    } else {
      d3Attachment = report.d3.attachment
      d4Attachment = report.d4.attachment
      d5d6Attachment = report.d5d6.attachment
      d7Attachment = report.d7.attachment
    }

    // Update of Report
    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      {
        "d3.teamMembers": teamMembers,
        "d3.w5h2": w5h2,
        "d3.attachment": d3Attachment,
        "d4.whyDet": whyDet,
        "d4.whyOcc": whyOcc,
        "d4.rootCauseDet": rootCauseDet,
        "d4.rootCauseOcc": rootCauseOcc,
        "d4.attachment": d4Attachment,
        "d5d6.attachment": d5d6Attachment,
        "d7.attachment": d7Attachment,
      },
      { new: true }
    )

    console.log(
      `D${req.body.submissionD} was updated at ${updatedReport?.updatedAt}`
    )

    res.redirect(`/report/${reportId}/details`)
  } catch (error) {
    next(error)
  }
}

const postApproveReport = async (req, res, next) => { 
  try {
    const { approveD } = req.body
    const { reportId } = req.params

    const reportFound = await Report.findById(reportId)
    let reportFullApproval = reportFound.approval

    const { d3, d4, d5d6, d7 } = reportFound
    let d3Approval = d3.approval,
      d4Approval = d4.approval,
      d5d6Approval = d5d6.approval,
      d7Approval = d7.approval

    if (approveD === "3") d3Approval === false ? (d3Approval = true) : (d3Approval = false)
    if (approveD === "4") d4Approval === false ? (d4Approval = true) : (d4Approval = false)
    if (approveD === "5") d5d6Approval === false ? (d5d6Approval = true) : (d5d6Approval = false)
    if (approveD === "7") d7Approval === false ? (d7Approval = true) : (d7Approval = false)

    if (d3Approval && d4Approval && d5d6Approval && d7Approval) {
      reportFullApproval = true
    } else {
      reportFullApproval = false
    }

    console.log('report Full approval: ', reportFullApproval)

    const partialApprovedReport = await Report.findByIdAndUpdate(
      reportId,
      {
        "d3.approval": d3Approval,
        "d4.approval": d4Approval,
        "d5d6.approval": d5d6Approval,
        "d7.approval": d7Approval,
        "approval": reportFullApproval
      },
      { new: true }
    )

    res.redirect(`/report/${reportId}/details`)
  } catch (error) {
    next(error)
  }
}

const getDownloadAttachment = async (req, res, next) => { 
  try {
    const { reportId, attachmentName } = req.params

    const report = await Report.findById(reportId)

    let attachmentData, attachmentFileName
    if (attachmentName === "d3" && report.d3.attachment) {
      attachmentData = report.d3.attachment.data
      attachmentFileName = report.d3.attachment.filename
    }
    if (attachmentName === "d4" && report.d4.attachment) {
      attachmentData = report.d4.attachment.data
      attachmentFileName = report.d4.attachment.filename
    }
    if (attachmentName === "d5d6" && report.d5d6.attachment) {
      attachmentData = report.d5d6.attachment.data
      attachmentFileName = report.d5d6.attachment.filename
    }
    if (attachmentName === "d7" && report.d7.attachment) {
      attachmentData = report.d7.attachment.data
      attachmentFileName = report.d7.attachment.filename
    }

    if (attachmentData && attachmentFileName) {
      // Defines the content type to set in header attributes
      const contentType = getContentType(attachmentFileName)

      res.setHeader("Content-Type", contentType)
      res.setHeader(
        "Contet-disposition",
        `attachment; filename=${attachmentFileName}`
      )
      
      // The data is in Binary so is needed to convert it to buffer
      res.send(attachmentData.buffer)
    } else {
      res.status(404).send("Attachment not found")
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getReportDetails,
  postReportUpdate,
  postApproveReport,
  getDownloadAttachment,
}