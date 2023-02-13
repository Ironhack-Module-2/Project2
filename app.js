require('dotenv').config();

const express = require('express');

const logger = require('morgan');
const createError = require('http-errors');
const passport = require('passport');



app.use(logger('dev'));
app.use(express.urlencoded({ extended: false })); // para que el body de las peticiones se pueda leer

//DB conection
require('./config/db.config');

//handlebars config
require('./config/hbs.config');

// Passport config.
require('./config/passport.config');

const app = express();

/* Session middlewares */
const { sessionConfig } = require('./config/session.config');
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());



app.set('views', __dirname + '/views');
app.set('view engine', 'hbs')
const router = require('./config/routes.config');
app.use('/', router);

/* Errors middlewares */

/* app.use((req, res, next) => {
    next(createError(404, 'Resource not found'));
  });
  
  app.use((error, req, res, next) => {
    console.log(error)
    let status = error.status || 500;
  
    res.status(status).render('error', {
      message: error.message,
      error: req.app.get('env') === 'development' ? error : {}
    })
  }) */


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));