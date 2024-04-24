// post.js  (Post Model)

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        // Define the fields of the Post model
        title: {
            type: DataTypes.STRING,
            allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    publication_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
}
)

module.exports = Post;