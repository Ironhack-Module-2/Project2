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
                res.render('home/home-artist')
          }
};



/* module.exports.isArtist = (req, res, next) => {
    res.render('home')
}; */