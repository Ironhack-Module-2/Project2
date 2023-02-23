const User = require('../models/User.model');

const mongoose = require('mongoose');




 module.exports.isArtist = (req, res, next) => {
        if (req.user.role === 'artist') {
                    res.render('profile/artist')
        } else {
            console.log('entro')
            res.render('profile/hunter')     
        };
    };

/* module.exports.detail = (req, res, next) => {
        res.render('hunter-views/artist-detail')
    }; */


    

  module.exports.detail = (req, res) => {
    User.findById(req.params.id)
            //.populate( 'user')
            .then(user => {
                res.render('hunter-views/artist-detail', { user })
          })
          .catch(err => res.send(err))
      }