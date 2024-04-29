const { Comment } = require('../models');

const commentData = [
    {
        content: "No way!",
        author: 2,
        id: 1,
        
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;