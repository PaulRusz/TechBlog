// controllers/index.js

const router = require('express').Router();
const apiRoutes = require('./api')
const homeRoutes = require('./homeRoutes')
const dashboardRoutes = require('./dashboardRoutes');
const postRoutes = require('./api/postRoutes');
const commentRoutes = require('./api/commentRoutes')



router.use('/', homeRoutes); 
router.use('/api', apiRoutes); 
router.use('/dashboard', dashboardRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes)


module.exports = router;