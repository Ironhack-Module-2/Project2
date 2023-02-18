
const Job = require('../models/Job.model');
const User = require('../models/User.model');
const mongoose = require('mongoose');


module.exports.home = (req, res, next) => {
    if (req.user.role === 'hunter') {
        Job.find({ user: { $ne: req.user.id } })
         Job.find()
        .populate('owner')
            .then(jobs => {
            res.render('home/home-hunter', { jobs });
            })
            .catch(err => next(err))
            } else {
                res.render("home/profile-set");
          }
};



/* module.exports.isArtist = (req, res, next) => {
    res.render('home')
}; */



module.exports.artist= (req, res, next) => {
    if (req.user.role === 'artist') {
        res.render('home/profile-set')
    } else {
        res.render('home/home-hunter')
    }


module.exports.homeArtist = (req, res, next) => {
  Job.find()
    .then((jobs) => {
      res.render("home/home-artist", { jobs });
    })
    .catch((err) => next(err));

};
