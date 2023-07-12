// @ts-nocheck
const User = require("../models/User.model")
const Main = require("../models/Main.model")
const Action = require("../models/Action.model")
const Complaint = require("../models/Complaint.model")
const Report = require("../models/Report.model")
const mongoose = require("mongoose")
const transporter = require('../config/transporter.config')
const templates = require('../templates/template')

const sendMail = require('../utils/sendMail')


// Creation of Complaint and trigger of Report
const getCreateComplaint = async (req, res, next) => {
  try {
    const { users, _id: mainId } = req.session.currentUser
    const main = await Main.findById(mainId).populate("users")
    const allSuppliers = main?.users

    if (allSuppliers?.length === 0) {
      return res.render("complaint/create", {
        errorMessage: "No suppliers available",
      })
    } else {
      res.render("complaint/create", { allSuppliers })
    }
  } catch (error) {
    next(error)
  }
}

const postCreateComplaint = async (req, res, next) => {
  const {
    userId,
    partNumber,
    batch,
    quantity,
    problemDate,
    problemDesc,
  } = req.body

  const { _id: mainId } = req.session.currentUser

  try {
    const main = await Main.findById(mainId).populate("users")
    const allSuppliers = main?.users

    if (!userId) {
      return res.render("complaint/create", {
        errorMessage: "Supplier is required",
        allSuppliers,
      })
    }
    if (!partNumber) {
      return res.render("complaint/create", {
        errorMessage: "Part number is required",
        allSuppliers
      })
    }
    if (!batch) {
      return res.render("complaint/create", {
        errorMessage: "Batch number is required",
        allSuppliers
      })
    }
    if (!quantity) {
      return res.render("complaint/create", {
        errorMessage: "Quantity number is required",
        allSuppliers
      })
    }
    if (!problemDate) {
      return res.render("complaint/create", {
        errorMessage: "Problem date is required",
        allSuppliers,
      })
    }
    if (!problemDesc) {
      return res.render("complaint/create", {
        errorMessage: "Problem description is required",
        allSuppliers
      })
    }
    if (!req.file.path) {
      return res.render("complaint/create", {
        errorMessage: "Problem image is required",
        allSuppliers,
      })
    }

    // Creates the complaint
    const complaintCreated = await Complaint.create({
      userId,
      partNumber,
      batch,
      quantity,
      problemDate,
      problemDesc,
      problemImg: req.file.path, // file path created by middleware fileUploader
    })
    // Adds the id of the created complaint and report to the Main account
    const updatedMain = await Main.findByIdAndUpdate(
      mainId,
      { $push: { complaints: complaintCreated._id } },
      { new: true }
    )

    // Creates the report
    const reportCreated = await Report.create({ approval: false })
    
    // Add the Id of the created Report to the Complaint raised by Main Account
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintCreated._id,
      { report: reportCreated._id }
    )

    // email for created complaint
    const user = await User.findById(userId)
    const { org: mainOrg } = main
    const { email: userEmail, org: userOrg } = user
    const { _id: complaintId } = complaintCreated
    const subject = `New complaint ${complaintId}`
    const message = `Complaint raised to ${userOrg} from ${mainOrg}`
    sendMail(userEmail, message, subject, templates.complaintRaised )

    res.redirect(`/auth/profile`)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const main = await Main.findById(mainId).populate("users")
      const allSuppliers = main?.users
      res.status(400).render("complaint/create", { allSuppliers, errorMessage: error.message })
    } else {
      next(error)
    }
  }
}

const getDetailsComplaint = async (req, res, next) => {
  const { complaintId } = req.params
  const { _id: accountId, main: isMain } = req.session.currentUser
  const complaint = await Complaint.findById(complaintId).populate('report').populate('userId')
  const { problemDate } = complaint
  const date = new Date(problemDate)
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate() + 1}`.slice(-2)
  let configuredDate = year + '-' + month + '-' + day

  if (isMain) {
    const mainUser = await Main.findById(accountId).populate({
      path: 'users',
      match: { _id: {$ne: complaint.userId}}
    })
    const allSuppliers = mainUser?.users

    res.render("complaint/complaint", {
      complaint,
      allSuppliers,
      configuredDate,
      userInSession: req.session.currentUser,
    })
  } else {
    res.render("complaint/complaint", {
      complaint,
      configuredDate,
      userInSession: req.session.currentUser,
    })
  }
}

const postUpdateComplaint = async (req, res, next) => { 
  const { _id: mainId } = req.session.currentUser
  const { complaintId } = req.params
  const { userId, partNumber, batch, quantity, problemDesc, problemDate, existingProblemImg } = req.body

  const problemImg = req.file ? req.file.path : existingProblemImg

  try {
    const mainAccount = await Main.findById(mainId).populate("users")
    const allSuppliers = mainAccount.users

    if (!userId) {
      return res.render("complaint/create", {
        errorMessage: "Supplier is required",
        allSuppliers,
      })
    }
    if (!partNumber) {
      return res.render("complaint/create", {
        errorMessage: "Part number is required",
        allSuppliers,
      })
    }
    if (!batch) {
      return res.render("complaint/create", {
        errorMessage: "Batch number is required",
        allSuppliers,
      })
    }
    if (!quantity) {
      return res.render("complaint/create", {
        errorMessage: "Quantity number is required",
        allSuppliers,
      })
    }
    if (!problemDate) {
      return res.render("complaint/create", {
        errorMessage: "Problem date is required",
        allSuppliers,
      })
    }
    if (!problemDesc) {
      return res.render("complaint/create", {
        errorMessage: "Problem description is required",
        allSuppliers,
      })
    }
    if (!problemImg) {
      return res.render("complaint/create", {
        errorMessage: "Problem image is required",
        allSuppliers,
      })
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        userId,
        partNumber,
        batch,
        quantity,
        problemDate,
        problemDesc,
        problemImg,
      },
      { new: true }
    )
    res.redirect(`/complaint/${complaintId}/details`)
    
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const main = await Main.findById(mainId).populate("users")
      const allSuppliers = main?.users
      res.status(400)
        .render(`complaint/complaint`, {
          allSuppliers,
          errorMessage: error.message,
        })
    } else {
      next(error)
    }
  }
}

const postDeleteComplaint = async (req, res, next) => { 
  try {
    const { _id: mainId } = req.session.currentUser
    const { complaintId } = req.params

    // Deletion of Complaint
    const complaintDeleted = await Complaint.findByIdAndDelete(complaintId)
    console.log("complaint deleted: ", complaintDeleted._id)
    
    // Deletion of Complaint from Main's complaints Array
    const main = await Main.findById(mainId)
    main.complaints.pull(complaintDeleted)
    await main.save()

    // Deletion of Report related to Complaint
    const relatedReportDeleted = await Report.findByIdAndDelete(complaintDeleted.report)
    console.log("report deleted: ", relatedReportDeleted._id)

    // Deletion of Actions related to Report
    const { actionsD3, actionsD5D6, actionsD7 } = relatedReportDeleted
    const allActionsId = [...actionsD3, ...actionsD5D6, ...actionsD7]
    for (const actionId of allActionsId) {
      const deletedAction = await Action.findByIdAndDelete(actionId)
      console.log("action deleted: ", deletedAction._id)
    }

    res.redirect("/auth/profile")
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCreateComplaint,
  postCreateComplaint,
  getDetailsComplaint,
  postUpdateComplaint,
  postDeleteComplaint
}
