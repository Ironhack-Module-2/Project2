const { application } = require('express');
const hbs = require('hbs');
const path = require('path');
hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('isOwner', function (options) {
    const { currentUser, jobOwnerId } = options.hash; //de donde sale jobOwnerId????
  
    if (currentUser && currentUser._id.toString() === jobOwnerId.toString()) {
      return options.fn(this); //true
    } else {
      return options.inverse(this);
    }
  })

  /* hbs.registerHelper('isArtist', function (options) {
    const { currentUser } = options.hash;
  
    if (currentUser.role !== 'Artist') {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }

  }) */

 hbs.registerHelper('hasApplied', function (options) {
    const { currentUser, job } = options.hash;
    console.log({ currentUser })

    // like.tweet no es de tipo string, es de tipo object porque es un objectId
    // así que le metemos un .toString() y asi se compara guay
    if (currentUser.apps.some(app => app.job.toString() === job._id.toString())) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })

  hbs.registerHelper('hasContact', function (options) {
    const { job, app, user } = options.hash; //ausilio, va job o no?

    console.log(app)

    if (application.status === 'Not contacted') {
      return options.inverse(this); //me falta un tercer if que no se como poner
    } else {
      return options.fn(this);
    }
  });

  })

  hbs.registerHelper('formatDate', (date) => {
    const toDate = new Date(date)
  
    let day = toDate.getDate()
    let month = toDate.getMonth() + 1
    let year = toDate.getFullYear()
  
    if (month < 10) {
      return `${day}-0${month}-${year}`
    } else {
      return `${day}-${month}-${year}`
    }
  })

