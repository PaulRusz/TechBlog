const { User } = require('../models');

const userData =
[
  {
    "name": "Travis",
    "email": "travis@gmail.com",
    "password": "travis12345"
  },

]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;