const nodemailer = require("nodemailer");
const { generateEmail } = require("./mailtemplate");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendMail = (emailToSend, subject, message) => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: [emailToSend, process.env.NODEMAILER_EMAIL],
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
};

module.exports = sendMail;
