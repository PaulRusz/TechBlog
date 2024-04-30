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

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//  Will check to see if path to public folder is valid
app.use(express.static("./public"))

// Middleware that creates the body property on the request object
app.use(express.json())

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  // comment