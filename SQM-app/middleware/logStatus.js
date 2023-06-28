module.exports = (req, res, next) => {
  if (req.session.currentUser) req.app.locals.isLoggedIn = true
  else req.app.locals.isLoggedIn = false

  next()
}
