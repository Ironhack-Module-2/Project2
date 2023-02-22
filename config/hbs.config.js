const hbs = require('hbs');
const path = require('path');
hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('isOwner', function (options) {
    const { currentUser, jobOwnerId } = options.hash;
  
    if (currentUser && currentUser.id === jobOwnerId) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
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