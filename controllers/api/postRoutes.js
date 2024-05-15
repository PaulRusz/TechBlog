const express = require('express')
const { Post } = require('../../models');
const router = express.Router();


// Route to create a new post
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;

        // Check if title and content are provided
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        // Create a new post with the provided title and content
        const newPost = await Post.create({
            title,
            content
        });
        // Log a message when the post is successfully created
        console.log('Blog Post Created!');

        // Redirect to the homepage after creating the post
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create post' });
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


// Route to get comments for a specific post
router.get('/posts/:postId/comments', async (req, res) => {
    try {
        const postId = req.params.postId;
        
        // Find the post by ID
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Get the comments for the post
        const comments = await post.getComments();

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get comments for the post' });
    }
});

// Route to get all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get posts' });
    }
});


// Route to delete a post
router.delete('/post/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;

        // Find the post by ID and delete it
        const deletedPost = await Post.findByPk(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await deletedPost.destroy();

        return res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete post' });
    }
});


module.exports = router;