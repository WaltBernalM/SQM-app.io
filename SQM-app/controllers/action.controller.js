// @ts-nocheck
const User = require("../models/User.model")
const Main = require("../models/Main.model")
const Complaint = require("../models/Complaint.model")
const Report = require("../models/Report.model")
const mongoose = require("mongoose")
const Action = require("../models/Action.model")

const postCreateAction = async (req, res, next) => {
  try {
    const { reportId } = req.params
    const {
      dStep: destination,
      content,
      ownerName,
      dueDate: dateToConvert,
    } = req.body

    // Security check for missing fields
    if (!ownerName || !dateToConvert || !content) { 
      return res.redirect(`/report/${reportId}/details`)
    }
    
    const dueDate = new Date(dateToConvert)
    const actionCreated = await Action.create({ content, ownerName, dueDate, reportId })

    let reportUpdated
    if (destination === "d3") {
      reportUpdated = await Report.findByIdAndUpdate(
        reportId,
        { $push: { actionsD3: actionCreated._id } },
        { new: true }
      )
    } else if (destination === "d5d6") {
      reportUpdated = await Report.findByIdAndUpdate(
        reportId,
        { $push: { actionsD5D6: actionCreated._id } },
        { new: true }
      )
    } else {
      reportUpdated = await Report.findByIdAndUpdate(
        reportId,
        { $push: { actionsD7: actionCreated._id } },
        { new: true }
      )
    }

    res.redirect(`/report/${reportId}/details`)

  } catch (error) {
    next(error)
  }
  
}

const postActionUpdate = async (req, res, next) => {
  try {
    const { content, ownerName, closeDate, reportId } = req.body
    const { actionId } = req.params
    const updatedAction = await Action.findByIdAndUpdate(
      actionId,
      { content, ownerName, closeDate },
      { new: true }
    )
    console.log(updatedAction)

    const report = await Report.findById(updatedAction?.reportId)
    
    res.redirect(`/report/${report?._id}/details`)
  } catch (error) {
    next(error)
  }

}

const postActionDelete = async (req, res, next) => {
  try {
    const { actionId } = req.params
    const actionDeleted = await Action.findByIdAndDelete(actionId)
    const report = await Report.findById(actionDeleted?.reportId)

    report.actionsD3.pull(actionDeleted)
    report.actionsD5D6.pull(actionDeleted)
    report.actionsD7.pull(actionDeleted)
    await report.save()

    res.redirect(`/report/${report._id}/details`)
  } catch (error) {
    next(error)
  }
};

module.exports = { postCreateAction, postActionUpdate, postActionDelete}