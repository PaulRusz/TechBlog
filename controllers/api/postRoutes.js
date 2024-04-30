const express = require('express')
const { Post } = require('../../models');
const router = require('express').Router();


// Route to create a new post
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        console.log(req.body)

        // Check if title and content are provided
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        // Create a new post with the provided title and content
        const newPost = await Post.create({
            title,
            content
        });

        res.status(201).json(newPost); // Return the newly created post
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create post' });
    }
});


// Route to update post
router.put('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId
        const { title, content } = req.body

        // Find the post by ID and update its title and content
        const updatedPost = await Post.findByPk(postId)
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' })
        }

        updatedPost.title = title
        updatedPost.content = content
        await updatedPost.save();

        res.json(updatedPost)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to update post' })
    }
})


// Route to delete a post
router.delete('posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId

        // Find the post by ID and delete it
        const deletedPost = await Post.findByPk(postId)
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' })
        }

        await deletedPost.destroy()

        res.json({ message: 'Post deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to delete post' })
    }
})

module.exports = router;