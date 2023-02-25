module.exports.isHunter = (req, res, next) => {
  if (req.user.role === 'hunter' ) {
    next()
  } else {
    res.redirect('/') //view de 'no eres hunter'
  }
}

module.exports.isArtist = (req, res, next) => {
  if (req.user.role === 'Artist') {
    next()
  } else {
    res.redirect('/')
  }
}

module.exports.isArtist = (req, res, next) => {
  if (req.user.role === 'artist') {
    next()
  } else {
    res.redirect('/profile-set') //view de 'no eres artist'
  }
}


