const User = require("../models/User.model");
const Application = require("../models/Application.model");
const sendMail = require("../config/mailer");
const mongoose = require("mongoose");

module.exports.isArtist = (req, res, next) => {
  if (req.user.role === "artist") {
    res.render("profile/artist");
  } else {
    res.render("profile/hunter");
  }
};

/* module.exports.detail = (req, res, next) => {
        res.render('hunter-views/artist-detail')
    }; */

module.exports.detail = (req, res) => {
  const userId = req.params.id;
  const appId = req.params.appId;
  User.findById(userId)
    //.populate( 'user')
    .then((user) => {
      res.render("hunter-views/artist-detail", { user, appId });
    })
    .catch((err) => res.send(err));
};

module.exports.message = (req, res) => {
  const { appId } = req.params;
  const subject = req.body.subject;
  const message = req.body.message;
  const email = req.body.email;

  console.log("********* ", subject, message, email, appId);

  sendMail(email, subject, message); //puedo aquí pasar el estado de not contacted a contacted?

  Application.findByIdAndUpdate(appId, { status: "Contacted" })
    .then(() => {
      res.redirect("/confirmation");
    })
    .catch((err) => res.send(err));
};

module.exports.messageSent = (req, res, next) => {
  res.render("misc/confirmation");
};
