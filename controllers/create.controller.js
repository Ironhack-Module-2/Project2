const Job = require('../models/Job.model');
const mongoose = require('mongoose');


module.exports.create = (req, res, next) => {
    res.render('jobs/create')
};

module.exports.doCreate = (req, res, next) => {
   const newJob = {
    ...req.body, 
    owner: req.user.id
   }
   
   Job.create(newJob)
   .then(job => {
    res.redirect('/home')

   })
   .catch(err => console.log(err))
}
