const express = require("express")
const userRouter = express.Router()
const {
  getSignup,
  postSignup,
  getProfile,
  getLogin,
  postLogin,
} = require("../controllers/auth.controller")

const isLoggedIn = require("../middleware/isLoggedIn")
const isLoggedOut = require("../middleware/isLoggedOut")
const logStatus = require("../middleware/logStatus")

/* Signup */
userRouter.get("/signup", isLoggedOut, getSignup)
userRouter.post("/signup", postSignup)

/* Login */
userRouter.get("/login", isLoggedOut, getLogin)
userRouter.post("/login", postLogin)

/* Profile */
userRouter.get("/profile", logStatus, isLoggedIn, getProfile)

/* Logout */
userRouter.get("/logout", isLoggedIn, logStatus, (req, res, next) => {
  // @ts-ignore
  req.session.destroy((err) => {
    if (err) next(err)
    res.clearCookie("connect.sid")
    res.redirect("/")
  })
})

module.exports = userRouter
