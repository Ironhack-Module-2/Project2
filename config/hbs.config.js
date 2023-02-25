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
  if (
    currentUser.apps.some((app) => app.job.toString() === job._id.toString())
  ) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("hasContact", function (options) {
  const { job, app, user } = options.hash;

  if (app.status === "Not contacted") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("hasCasting", function (options) {
  const { job, app, user } = options.hash;

  if (app.status === "Contacted") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("hasConfirmed", function (options) {
  const { job, app, user } = options.hash;

  if (app.status === "Casting Confirmed") {
    return options.fn(this);
  } else {
    return options.inverse(this);
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
