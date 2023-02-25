require('dotenv').config();

const express = require('express');

const logger = require('morgan');
const createError = require('http-errors');
const passport = require('passport');
const path = require('path');

const nodemailer = require('nodemailer')

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false })); // para que el body de las peticiones se pueda leer

//DB conection
require('./config/db.config');

//handlebars config
require('./config/hbs.config');

// Passport config.
require('./config/passport.config');


/* Session middlewares */
const { sessionConfig } = require('./config/session.config');
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=> {
  res.locals.currentUser = req.user;
  next()
});
 


app.set('views', __dirname + '/views');
app.set('view engine', 'hbs')
const router = require('./config/routes.config');
app.use('/', router);

/** Configure static files */
app.use(express.static("public"))

/* Errors middlewares */

app.use((req, res, next) => {
    next(createError(404, 'Resource not found'));
  });
  
  app.use((error, req, res, next) => {
    console.log(error)
    let status = error.status || 500;
  
    res.status(status).render('error', {
      message: error.message,
      error: req.app.get('env') === 'development' ? error : {}
    })
  })


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));