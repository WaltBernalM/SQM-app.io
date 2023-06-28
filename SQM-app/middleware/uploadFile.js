module.exports = (req, res, next) => {
  let { problemImg } = req.body
  
  if (!problemImg) { 
    // console.log('no Img attached')
    next()
  }
  // validation of img type
  // link to 3rd party DB, returns an url
  req.body.problemImg = "some URL"
  next()
}
