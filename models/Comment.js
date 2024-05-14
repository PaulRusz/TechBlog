
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING, // Use DataTypes.STRING instead of DataTypes.String
            allowNull: false, // Use allowNull instead of required
        },
        author: {
            type: DataTypes.STRING, // Use DataTypes.STRING for string data type
            allowNull: false, // Use allowNull instead of required
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Use DataTypes.NOW for default value
        },
    },
    {
        sequelize, // Pass the Sequelize instance here
        modelName: 'Comment'
    }
);

module.exports = Comment;