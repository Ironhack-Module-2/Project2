const User = require("../models/User.model");
const Application = require("../models/Application.model");
const sendMail = require("../config/mailer");
const mongoose = require("mongoose");

module.exports.isArtist = (req, res, next) => {
  if (req.user.role === "artist") {
    res.render("profile/artist");
  } else {
    User.findOne({ _id: req.user._id, role: "hunter" })
      .then((currentUsers) => {
        if (!currentUsers) {
          return res.status(404).send("No se pudo encontrar el usuario actual");
        }
        res.render("profile/hunter", { currentUsers });
      })
      .catch((err) => next(err));
  }
};

/*module.exports.isArtist = (req, res, next) => {
  if (req.user.role === "artist") {
    res.render("profile/artist");
  } else {
    User.find({ role: "hunter" })
    .then((currentUser) => {
      res.render("profile/hunter", { currentUser });
    })
    .catch((err) => next(err));
   
  }
}; */

/* module.exports.detail = (req, res, next) => {
        res.render('hunter-views/artist-detail')
    }; */

module.exports.detail = (req, res) => {
  const userId = req.params.id;
  const appId = req.params.appId;

  User.findById(userId)
    .then((user) => {
      return Application.findById(appId).then((app) => {
        res.render("hunter-views/artist-detail", { user, app });
      });
    })
    .catch((err) => res.send(err));
};

module.exports.message = (req, res) => {
  const { appId } = req.params;
  const subject = req.body.subject;
  const message = req.body.message;
  const email = req.body.email;

  console.log("********* ", subject, message, email, appId);

  // PRUEBA AQUÍ
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

module.exports.confirm = (req, res) => {
  const { id, appId } = req.params;

  Application.findByIdAndUpdate(appId, { status: "Casting Confirmed" })
    .then(() => {
      res.redirect(`/profile/${id}/${appId}/detail`);
    })
    .catch((err) => res.send(err));
};
