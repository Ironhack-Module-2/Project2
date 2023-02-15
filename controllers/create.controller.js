const Job = require('../models/Job.model');
const mongoose = require('mongoose');


module.exports.create = (req, res, next) => {
    console.log('entro')
    res.render('jobs/create')
};

module.exports.doCreate = (req, res, next) => {
    Job.create(req.body)
    .then(job => {
        const newJob = {
            ...req.body,
            user: req.user.id
          }
        res.redirect('/home-hunter')
    })
    .catch(err => res.send(err))
};

