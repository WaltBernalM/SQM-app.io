const User = require("../models/User.model")
const Main = require("../models/Main.model")
const Complaint = require("../models/Complaint.model")
const Report = require("../models/Report.model")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


// Creation of Complaint and trigger of Report
const getCreateComplaint = async (req, res, next) => {
  const { users, _id: mainId } = req.session.currentUser
  
  if (users.length === 0) {
    return res.render("complaint/create", { errorMessage: "No suppliers available" })
  }

  const main = await Main.findById(mainId).populate("users")
  const allSuppliers = main?.users

  res.render("complaint/create", { allSuppliers })
}

const postCreateComplaint = async (req, res, next) => {
  const {
    userId,
    partNumber,
    batch,
    quantity,
    problemDate,
    problemDesc,
    problemImg
  } = req.body

  const { _id: mainId } = req.session.currentUser

  try {
    if (!userId) {
      return res.render("complaint/create", {
        errorMessage: "Supplier is required",
      })
    }
    if (!partNumber) {
      return res.render("complaint/create", {
        errorMessage: "Part number is required",
      })
    }
    if (!batch) {
      return res.render("complaint/create", {
        errorMessage: "Batch number is required",
      })
    }
    if (!quantity) {
      return res.render("complaint/create", {
        errorMessage: "Quantity number is required",
      })
    }
    if (!problemDate) {
      return res.render("complaint/create", {
        errorMessage: "Problem date is required",
      })
    }
    if (!problemDesc) {
      return res.render("complaint/create", {
        errorMessage: "Problem date is required",
      })
    }
    if (!problemImg) {
      return res.render("complaint/create", {
        errorMessage: "Problem image is required",
      })
    }

    // Creates the complaint
    const complaintCreated = await Complaint.create({
      mainId,
      userId,
      partNumber,
      batch,
      quantity,
      problemDate,
      problemDesc,
      problemImg,
    })

    // Creates the report by complaint data
    const complaint = complaintCreated._id
    const reportCreated = await Report.create({
      complaint,
      mainId,
      userId,
    })

    // Adds the id of the report to the complaint
    const report = reportCreated._id
    const updatedComplaint = await Complaint.findByIdAndUpdate(complaint, {
      report,
    })

    // Adds the id of the created complaint and report to the Main account
    const updatedMain = await Main.findByIdAndUpdate(
      mainId,
      { $push: { complaints: complaint} },
      { new: true }
    )
    
    // Adds the id of the created report to the User account
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { reports: report, complaints: complaint } },
      { new: true }
    )

    res.redirect(`/auth/profile`)

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).render("complaint/create", { errorMessage: error.message })
    } else {
      next(error)
    }
  }
}

// Read of Complaint and trigger of Report


module.exports = {
  getCreateComplaint,
  postCreateComplaint
}
