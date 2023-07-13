const transporter = require('../config/transporter.config')

const sendMail = async (email, message, subject, template) => {
  try {
    await transporter.sendMail({
      from: `"SQM.copilot" <${process.env.EMAIL_ADDRESS}>`,
      to: email,
      subject: `${subject}`,
      text: `${message}`,
      html: template(message),
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendMail