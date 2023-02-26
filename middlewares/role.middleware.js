module.exports.isHunter = (req, res, next) => {
  if (req.user.role === "hunter") {
    next();
  } else {
    res.redirect("/"); //view de 'no eres hunter'
  }
};

module.exports.isArtist = (req, res, next) => {
  if (req.user.role === "artist") {
    next();
  } else {
    res.redirect("/profile-set"); //view de 'no eres artist'
  }
};

module.exports.isFullfilled = (req, res, next) => {
  if (
    (req.user.role === "artist",
    req.user.image &&
      req.user.description &&
      req.user.height &&
      req.user.age) ||
    req.user.role === "hunter"
  ) {
    console.log("hola");
    next();
  } else {
    res.redirect("/profile-set");
  }
};
