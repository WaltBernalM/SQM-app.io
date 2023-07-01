module.exports = (req, res, next) => {
  let {
    problemImg,
    d3Attachment,
    d4Attachment,
    d5d6Attachment,
    d7Attachment
  } = req.body

  if (!problemImg) { 
    next()
  
  }
  // validation of img type
  // link to 3rd party DB, returns an url
  req.body.problemImg = "some URL"
  next()
}
