const path = require('path')

const getContentType = (filename) => {
  const fileExtension = path.extname(filename)
  switch (fileExtension) {
    case ".pdf":
      return "application/pdf"
    case ".xlsx":
    case ".xlsm":
    case ".xls":
      return "application/vnd.ms-excel"
    case ".docx":
    case ".doc":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    case ".pptx":
    case ".ppt":
      return "application/vnd.ms-powerpoint"
    // Add more cases for other file types as needed
    default:
      return "application/octet-stream"
  }
}

module.exports = getContentType
