const User = require('../models/User.model');
const mongoose = require('mongoose');
const passport = require('passport');
const { GENERIC_ERROR_MESSAGE } = require('../config/passport.config');

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

    const { firstName, lastName, email, password, role } = req.body;

    User.findOne({ email })
      .then(user => {
        if (user) {
          renderWithErrors({ email: 'email already in use' })
        } else {
    
          User.create(req.body)
            .then(user => {
              res.redirect('/login')
            })
            .catch((err) => console.log('entro', err))
        }
      })
      .catch(err => {
        if (err instanceof mongoose.Error.ValidationError) {
          renderWithErrors(err.errors)
        } else {
          next(err)
        }
      })
};


 
module.exports.login = (req, res, next) => {
  res.render('auth/login');
}

/* module.exports.doLogin = (req, res, next) => {
  res.redirect('./home');
} */

/* module.exports.home = (req, res, next) => {
  res.render('./home')
} */

const doLoginWithStrategy = (req, res, next, strategy = 'local-auth') => {
  const { email, password } = req.body;
  if (strategy === 'local-auth') {

    if (!email || !password) {
      res.status(404).render('auth/login', { errorMessage: GENERIC_ERROR_MESSAGE })
    }
  }

  passport.authenticate(strategy, (err, user, validations) => {
    if (err) {
      next(err)
    } else if (!user) {
      res.status(404).render('auth/login', { user: { email }, errorMessage: validations.error })
    } else {
      req.login(user, (loginError) => {
        if (loginError) {
          next(loginError)
        } else {
          res.redirect('home');
        }
      })
    }
  })(req, res, next)
}

module.exports.doLogin = (req, res, next) => {
  doLoginWithStrategy(req, res, next)
}


module.exports.doLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/login')
}

module.exports.home = (req, res, next) => {
  res.render('./home')
}

