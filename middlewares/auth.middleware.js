module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
      console.log('entro en next de autenticated')
    } else {
      res.redirect('/login')
    }
  }
  
  module.exports.isNotAuthenticated = (req, res, next) => {
    if (req.isUnauthenticated()) {
      next()
    } else {
      res.redirect('/home')
    }
  }

  