const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Middleware to check if user is logged in
const checkAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  // Dashboard route to display user's dashboard with all posts
  router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Fetch all posts from the database
      const posts = await Post.findAll();
  
      // Render the dashboard template with all posts
      res.render('dashboard', { username: req.session.username, posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Dashboard route to handle logout
  router.post('/logout', withAuth, (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
  
  module.exports = router;


router.get('/new', checkAuth, (req, res) => {
    res.render('new-post');
});



module.exports = router;