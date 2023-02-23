const User = require('../models/User.model');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

module.exports.contact = (req, res, next) => {
    let { email, subject, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: req.user.email,
          pass: req.user.password 
        }
      });


    transporter.sendMail({
      from: `"${req.user.firstName}" <${req.user.email}>`,
      to: `${req.params.email}`,
      subject: subject, 
      text: message,
      html: `<b>${message}</b>`
    })
    .then((info) => res.send( {email, subject, message, info}))
    .catch(error => console.log(error));
  };