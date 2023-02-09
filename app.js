require('dotenv').config();

const express = require('express');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

require('./config/db.config');

const router = require('./config/routes.config');
app.use('/', router)



const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));