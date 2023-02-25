const { application } = require("express");
const hbs = require("hbs");
const path = require("path");
hbs.registerPartials(path.join(__dirname, "../views/partials"));
const moment = require("moment");

hbs.registerHelper("isOwner", function (options) {
  const { currentUser, jobOwnerId } = options.hash; //de donde sale jobOwnerId????

  if (currentUser && currentUser._id.toString() === jobOwnerId.toString()) {
    return options.fn(this); //true
  } else {
    return options.inverse(this);
  }
});

/* hbs.registerHelper('isArtist', function (options) {
    const { currentUser } = options.hash;
  
    if (currentUser.role !== 'Artist') {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }

  }) */

hbs.registerHelper("hasApplied", function (options) {
  const { currentUser, job } = options.hash;

  // like.tweet no es de tipo string, es de tipo object porque es un objectId
  // así que le metemos un .toString() y asi se compara guay
  if (
    currentUser.apps.some((app) => app.job.toString() === job._id.toString())
  ) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("hasContact", function (options) {
  const { job, app, user } = options.hash; //ausilio, va job o no?

  console.log(app);

  if (application.status === "Not contacted") {
    return options.inverse(this); //me falta un tercer if que no se como poner
  } else {
    return options.fn(this);
  }
});

hbs.registerHelper("elapsedTime", function (publicationDate) {
  const currentTime = new Date();
  const elapsedTime = Date.parse(currentTime) - Date.parse(publicationDate);

  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + " days";
  } else if (hours > 0) {
    return hours + " hours";
  } else if (minutes > 0) {
    return minutes + " minutes";
  } else {
    return seconds + " seconds";
  }
});
