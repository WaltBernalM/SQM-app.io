module.exports = (req, res, next) => {
  if (req.session.currentUser.main) {
    return res.redirect("/auth/profile")
  }
  next()
}
