require('dotenv').config();

const path = require('path');

// Required for setting up the Express.js server.
const express = require('express');

// Used for managing user sessions.
const session = require('express-session');

//The template engine for rendering views.
const exphbs = require('express-handlebars');
const routes = require('./controllers');


const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
// Integrates Sequelize with express-session for session storage.
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });