module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.session.currentUser.main) {
    return res.redirect("/auth/profile")
  }
  next()
}
