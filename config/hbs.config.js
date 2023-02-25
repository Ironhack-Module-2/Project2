const { application } = require("express");
const hbs = require("hbs");
const path = require("path");
hbs.registerPartials(path.join(__dirname, "../views/partials"));

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

hbs.registerHelper("formatDate", (date) => {
  const toDate = new Date(date);

  let day = toDate.getDate();
  let month = toDate.getMonth() + 1;
  let year = toDate.getFullYear();

  if (month < 10) {
    return `${day}-0${month}-${year}`;
  } else {
    return `${day}-${month}-${year}`;
  }
});
