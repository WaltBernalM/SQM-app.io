const transporter = require('../config/transporter.config')

const sendMail = async (email, message, subject, template, next) => {
  try {
    await transporter.sendMail({
      from: `"SQM.copilot" <${process.env.EMAIL_ADDRESS}>`,
      to: email,
      subject: `${subject}`,
      text: `${message}`,
      html: template(message),
    })
  } catch (error) {
    next(error)
  }
}

module.exports = sendMail