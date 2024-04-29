const express = require('express');
const { User, Comment, Post } = require('../models');
const router = express.Router();
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// GET route for the homepage
router.get('/', async (req, res) => {
    try {
        const recentPosts = await Post.findAll({ limit: 5, order: [['createdAt', 'DESC']] });
        res.render('homepage', { posts: recentPosts, loggedIn: req.session.loggedIn  
    });
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

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: User }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        loggedIn: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// POST route to submit a comment on a blog post
router.post('/post/:postId/comment', async (req, res) => {
    try {
        const newComment = await Comment.create({
            commentText: req.body.commentText,
            userId: req.session.userId,
            postId: req.params.postId
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to submit comment' });
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });


module.exports = router;