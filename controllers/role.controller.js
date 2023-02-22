

const Job = require('../models/Job.model');
const User = require('../models/User.model');
const mongoose = require('mongoose');


module.exports.home = (req, res, next) => {
    if (req.user.role === 'hunter') {
        Job.find({ user: { $ne: req.user.id } })
         Job.find()

        .populate('owner apps')

            .then(jobs => {
            res.render('home/home-hunter', { jobs });
            })
            .catch(err => next(err))
            } else {

                res.render("home/profile-set");
          }
};




module.exports.artist= (req, res, next) => {
    if (req.user.role === 'artist') {
        res.render('home/profile-set')
    } else {
        res.render('home/home-hunter')
    }

};

module.exports.homeArtist = (req, res, next) => {
  Job.find()
    .populate('owner')

    .then((jobs) => {
      res.render("home/home-artist", { jobs });
    })
    .catch((err) => next(err));


}


/*module.exports.doArtist = (req, res, next) => {
    const { id } = req.params;
    const {description, firstName, age, height } = req.body;

    let imageUrl;
    if(req.file) {
        imageUrl = req.file.path;
    } else {
        imageUrl = req.body.exisitingImage;
    }
  User.findByIdAndUpdate(id, { description, firstName, age, height, imageUrl }, { new: true })
    .then((user) => {
        if (user) {
        res.status(200).send('OK')
        }
    })
    .catch(next)
  
  }
  */





  module.exports.updateArtist = (req, res, next) => {
    res.render('home/profile-set')
    }

    module.exports.doUpdateArtist = (req, res, next) => {

        User.findByIdAndUpdate(req.user.id, req.body)
        .then(() => {
            res.redirect('/home')
        })
        .catch(next)
    }
    
  

};

module.exports.candidatesList = (req, res, next) => {
  console.log(req.user);
  User.find()
    .then((candidates) => {
      res.render("hunter-views/candidates", { candidates });
    })
    .catch((err) => next(err));

};

