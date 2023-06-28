const User = require("../models/User.model")
const MainUser = require("../models/Main.model")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Complaint = require("../models/Complaint.model")
const Report = require("../models/Report.model")

/**
 * Signup
 */

// GET
const getSignup = (req, res) => res.render("auth/signup")

// POST
const postSignup = async (req, res, next) => {
  const { username, email, password, confirmPassword, org } = req.body

  try {
    if (!email) {
      return res.render("auth/signup", { errorMessage: "Email is required" })
    }
    if (!username) {
      return res.render("auth/signup", { errorMessage: "Username is required" })
    }
    if (!password || !confirmPassword) {
      return res.render("auth/signup", {
        errorMessage: "Password and its confirmation are required",
      })
    }
    if (password !== confirmPassword) {
      return res.render("auth/signup", {
        errorMessage: "password validation must conicide",
      })
    }
    if (!org) {
      return res.render("auth/signup", {
        errorMessage: "password validation must Organization name is required",
      })
    }

    // email format validation
    // const userFound = await User.findOne({ email })
    // if (userFound) {
    // 	return res.render("auth/signup", { errorMessage: "email already registered" })
    // }

    // passwor safety validation
    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    // if (!regex.test(password)) {
    // 	return res.status(400).render("auth/signup", {
    // 		errorMessage: "Password must contain 1 special character, 1 uppercased letter, 1 digit, and larger than 7 characters"
    // 	})
    // }

    const salt = bcrypt.genSaltSync(12)
    const encryptedPass = bcrypt.hashSync(password, salt)
    const userCreated = await MainUser.create({
      username,
      email,
      password: encryptedPass,
      org,
    })
    req.session.currentUser = userCreated
    res.redirect(`/auth/profile`)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).render("auth/signup", { errorMessage: error.message })
    } else if (error.code === 11000) {
      // Error code 11000 means duplicated info in Schema object
      res.status(400)
        .render("auth/signup", {
          errorMessage: "Email or Username already registered",
        })
    } else {
      next(error)
    }
  }
}

/**
 * profile
 */
const getProfile = async (req, res, next) => {
  try {
    // console.log(req.session.currentUser)
    const { main: isMain } = req.session.currentUser
    if (isMain) {
      const { _id: mainId } = req.session.currentUser
      const allReports = await Report.find({ mainId }).populate('userId')
      
      // @ts-ignore
      res.render("user/main-user-profile", {
        userInSession: req.session.currentUser,
        allReports
      })
    } else {
      const { _id: userId } = req.session.currentUser
    }
    
  } catch (error) {
    next(error)
  }
}

/**
 * Login
 */

const getLogin = (req, res) => {
  res.render("auth/login")
}

//login for User and MainUser
const postLogin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    if (email === "" || password === "") {
      return res.render("auth/login", {
        errorMessage: "email and password are required",
      })
    }

    if (!email || !password) {
      return res.render("auth/login", {
        errorMessage: "email and password are required",
      })
    }

    let user = await MainUser.findOne({ email })
    console.log("MainUser:", user)

    if (!user) {
      user = await User.findOne({ email })
      console.log("User:", user)
      if (!user) {
        return res.render("auth/login", {
          errorMessage: "invalid password or email"
        })
      }
    } 

    const passMatch = bcrypt.compareSync(password, user.password)
    if (passMatch) {
      const loggedUser = user.toObject() // Gets the user (DB) logged converted to Object
      // @ts-ignore
      delete loggedUser.password
      req.session.currentUser = loggedUser
      console.log("req.session.currentUser:", req.session.currentUser)
      return res.redirect(`/auth/profile`)
    } else {
      res.render("auth/login", { errorMessage: "invalid password or email" })
    }
    
  } catch (error) {
    next(error)
  }
}

/**
 * Logout
 */

module.exports = {
  getSignup,
  postSignup,
  getProfile,
  getLogin,
  postLogin,
}
