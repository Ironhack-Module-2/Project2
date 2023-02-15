const Job = require('../models/Job.model');
const mongoose = require('mongoose');


module.exports.create = (req, res, next) => {
    res.render('jobs/create')
};

module.exports.doCreate = (req, res, next) => {
    Job.create(req.body)
    .then(job => {
        res.redirect('/home-hunter')
    })
    .catch(err => res.send(err))
};
