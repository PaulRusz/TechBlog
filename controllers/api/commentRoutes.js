const express = require('express')
const router = require('express').Router();
// Import the Comment model
const { Comment } = require('../../models')


// Route to get all comments for a specific post
router.get('/:postId/comments', async (req, res) => {
    try {
        const postId = req.params.postId
        const comments = await Comment.findAll({
            
                    where: { postId },
                    include: [{ model: Post, attributes: ['title'] }]
                });
                res.json(comments);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
        });


// Route to add a new comment to a post
router.post('/posts/:postId/comments', async (req, res) => {
    try {
        const postId = req.params.postId;
        const { text, author } = req.body; // Is this right? Assuming the request body contains text and author of the comment

        const newComment = await Comment.create({
            text,
            author, // Do I need to include author? Don't think I'm going to use it
            postId,
        })

        res.status(201).json(newComment)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to add comment' })
    }
} );


// Route to update a comment
router.put('/comments/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { text } = req.body; // Corrected from findbyPk to findByPk

        // Find the comment by ID and update its text
        const updatedComment = await Comment.findByPk(commentId);
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        updatedComment.text = text;
        await updatedComment.save();

        res.json(updatedComment); // Return the updated comment
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update comment' });
    }
});


// Route to delete a comment
router.delete('/comments/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const deletedComment = await Comment.findByPk(commentId)
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found'})
        }

        await deletedComment.destroy();

        res.json({ message: 'Comment deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to delete comment'})
    }
});

module.exports = router;