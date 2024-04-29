const express = require('express');
const { User, Comment, Post } = require('../models');
const router = express.Router();

// GET route for the homepage
router.get('/', async (req, res) => {
    try {
        const recentPosts = await Post.findAll({ limit: 5, order: [['createdAt', 'DESC']] });
        res.render('homepage', { posts: recentPosts, logged_in: req.session.logged_in });
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

        res.render('post', { post: postData, comments: commentsData, logged_in: req.session.logged_in });
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


module.exports = router;