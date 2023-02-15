module.exports.isHunter = (req, res, next) => {
  if (req.user.role === 'hunter') {
    next()
  } else {
    res.redirect('/profile') //view de 'no eres hunter'
  }
}