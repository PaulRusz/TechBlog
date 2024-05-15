const express = require('express');
const { User, Comment, Post } = require('../models');
const router = express.Router();
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');
const { error } = require('console');



// Login route - render the login form
router.get('/login', (req, res) =>{
  res.render('login', { loggedIn: req.session.loggedIn 
  })
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});


// POST route for user login
router.post('/login', async (req, res) => {
  try {
      const userData = await User.findOne({ where: { email: req.body.email } });

      if (!userData || !userData.checkPassword(req.body.password)) {
          res.status(400).json({ message: 'Incorrect email or password' });
          return;
      }

      req.session.save(() => {
          req.session.userId = userData.id;
          req.session.loggedIn = true;
          res.status(200).json({ user: userData, message: 'Login successful' });
      });
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to login' });
  }
});

// GET route for user registration form
router.get('/register', (req, res) => {
  res.render('register', { loggedIn: req.session.loggedIn }); // Render the registration form view
});



// Registration route - handles the form submission
router.post('/register', async (req, res) => {
  try {
      // Extract user input from the registration form
      const { username, email, password } = req.body;

      // Validate user input (e.g., check for empty fields, validate email format)

      // Check if the user already exists in the database
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the user's password for security
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user record in the database
      const newUser = await User.create({
          username,
          email,
          password: hashedPassword // Store the hashed password in the database
      });

      // Return the newly created user data in the response
      res.status(201).json({ message: 'User registered successfully', user: newUser });

      // Redirect the user to the dashboard after successful registration
      res.redirect('/dashboard'); // Redirect to the dashboard route
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to register user' });
  }
});


// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log(error)

    res.render('dashboard', {
      ...user,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(error)
  }
});



// GET route for the homepage to display blog posts
router.get('/', async (req, res) => {
  try {
      // Fetch blog posts from the database
      const recentPosts = await Post.findAll({ limit: 5, order: [['createdAt', 'DESC']] });

      // serialize data so the template can read it
      const posts = recentPosts.map((post) => post.get({ plain: true }))
      console.log(posts)

      // Render the homepage view with the list of blog posts
      res.render('homepage', { posts: posts, loggedIn: req.session.loggedIn });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to load homepage' });
  }
});



// GET route to retrieve an individual blog post by its ID
router.get('/post/:postId', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.postId, {
            include: [{ model: User, attributes: ['username'] }]
        });

        if (!postData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        const commentsData = await Comment.findAll({
            where: { postId: req.params.postId },
            include: [{ model: User, attributes: ['username'] }]
        });

        res.render('post', { post: postData, comments: commentsData, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});




// POST route to submit a comment on a blog post
router.post('/post/:postId/comment', async (req, res) => {
    try {
        const newComment = await Comment.create({
            commentText: req.body.commentText,
            userId: req.session.user_id,
            postId: req.params.postId
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to submit comment' });
    }
});



// POST route for user logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;