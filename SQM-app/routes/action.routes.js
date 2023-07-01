const express = require("express")
const actionRouter = express.Router()
const {
  postActionUpdate,
  postActionDelete
} = require("../controllers/action.controller")

const { postCreateAction } = require("../controllers/action.controller")

const isLoggedIn = require("../middleware/isLoggedIn")
const isLoggedOut = require("../middleware/isLoggedOut")
const isMainUser = require("../middleware/isMainUser")
const isUser = require("../middleware/isUser")
const logStatus = require("../middleware/logStatus")

/* View Report details */
actionRouter.post(`/:actionId/update`, isLoggedIn, isUser, postActionUpdate)

module.exports = actionRouter
