const express = require('express');
const { User, Comment, Post } = require('../models');
const router = express.Router();

// GET route for the homepage
router.get('/', async (req, res) => {
    try {
        const recentPosts = await Post.findAll({ limit: 5, order: [['createdAt', 'DESC']] });
        res.render('homepage', { posts: recentPosts });
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

        res.render('post', { post: postData, comments: commentsData });
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
            userId: req.session.userId,
            postId: req.params.postId
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to submit comment' });
    }
});

// GET route for user registration form
router.get('/register', (req, res) => {
    res.render('register'); // Render the registration form view
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