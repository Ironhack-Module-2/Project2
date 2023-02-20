const Job = require('../models/Job.model');
const mongoose = require('mongoose');


module.exports.create = (req, res, next) => {
    console.log('entro')
    res.render('jobs/create')
};

module.exports.doCreate = (req, res, next) => {
   const newJob = {
    ...req.body, 
    user: req.user.id
   }
   console.log('********* ', newJob)

   /*if(req.file) {
    newJob.image =  req.file.path
   }*/
   
   Job.create(newJob)
   .then(job => {
    
    res.redirect('/home-hunter')

   })
   .catch(err => console.log(err))
}
