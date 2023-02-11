const User = require('../models/User.model');
const mongoose = require('mongoose');

module.exports.signup = (req, res, next) => {
    res.render('auth/signup')
};

module.exports.doSignup = (req, res, next) => {
    const renderWithErrors = (errors) => {
      const userData = { ...req.body }
      delete userData.password

      res.render('auth/signup', {
        user: userData,
        errors
      })
    }

    console.log(req.body);

    const { firstName, lastName, email, password, role } = req.body;

    User.findOne({ email })
      .then(user => {
        if (user) {
          renderWithErrors({ email: 'email already in use' })
        } else {
            console.log('entro ********', req.body)
          return User.create(req.body)
        }
      })
      .then(userCreated => {
        console.log({ userCreated })
        res.redirect('/home')
      })
      .catch(err => {
        console.log('error *****', err)
        if (err instanceof mongoose.Error.ValidationError) {
          renderWithErrors(err.errors)
        } else {
          next(err)
        }
      })
};
