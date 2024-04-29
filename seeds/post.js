const { Post } = require('../models');

const postData = [
    {
        title: "First Post Example",
        content: "Here's proof this is sorta working.",
        user_id: 1
    },

]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;