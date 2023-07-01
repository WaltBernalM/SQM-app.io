const User = require("../models/User.model")
const Main = require("../models/Main.model")
const Complaint = require("../models/Complaint.model")
const Report = require("../models/Report.model")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


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
      userId,
      partNumber,
      batch,
      quantity,
      problemDate,
      problemDesc,
      problemImg,
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

    res.redirect(`/auth/profile`)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).render("complaint/create", { errorMessage: error.message })
    } else {
      next(error)
    }
  }
}


module.exports = {
  getCreateComplaint,
  postCreateComplaint
}
