const Job = require('../models/Job.model');
const mongoose = require('mongoose');


module.exports.home = (req, res, next) => {
    if (req.user.role === 'hunter') {
        res.render('home/home-hunter')
    } else {
        res.render('home/home-artist')
    }
};

/* module.exports.isArtist = (req, res, next) => {
    res.render('home')
}; */