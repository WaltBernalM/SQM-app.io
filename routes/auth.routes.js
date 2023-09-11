const express = require("express")
const userRouter = express.Router()
const {
  getSignup,
  postSignup,
  getProfile,
  getLogin,
  postLogin,
  getCreateUser,
  postCreateUser,
  getUsersList,
  getUpdateUser,
  postDeleteUser,
} = require("../controllers/auth.controller")

const isLoggedIn = require("../middleware/isLoggedIn")
const isLoggedOut = require("../middleware/isLoggedOut")
const logStatus = require("../middleware/logStatus")
const isMainUser = require("../middleware/isMainUser")

/* Signup */
userRouter.get("/signup", isLoggedOut, getSignup)
userRouter.post("/signup", postSignup)

/* Login */
userRouter.get("/login", isLoggedOut, getLogin)
userRouter.post("/login", postLogin)

/* Profile */
userRouter.get("/profile", isLoggedIn, logStatus, getProfile)

/* Logout */
userRouter.get("/logout", isLoggedIn, logStatus, (req, res, next) => {
  // @ts-ignore
  req.session.destroy((err) => {
    if (err) next(err)
    res.clearCookie("connect.sid")
    res.redirect("/")
  })
})

userRouter.get("/create-user", isLoggedIn, logStatus, isMainUser, getCreateUser)

userRouter.post("/create-user", postCreateUser)

userRouter.get("/users-list", isLoggedIn, logStatus, isMainUser, getUsersList)

userRouter.get("/edit-user/:userId", isLoggedIn, logStatus, isMainUser, getUpdateUser)

/* 
//incomplete edition by now
userRouter.post("/edit-user/:userId") 
*/

userRouter.post("/delete-user/:userId", isLoggedIn, logStatus, isMainUser, postDeleteUser)

module.exports = userRouter
