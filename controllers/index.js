// controllers/index.js

const router = require('express').Router();

const apiRoutes = require('./api')

const homeRoutes = require('./homeRoutes')
const userRoutes = require('./userRoutes')
const postRoutes = require('./api/postRoutes')
const commentRoutes = require('./commentRoutes')
const authRoutes = require('./authRoutes')


router.use('/api', apiRoutes);

router.use('/', homeRoutes);
router.use('/', userRoutes);
router.use('/', postRoutes);
router.use('/', commentRoutes);
router.use('/', authRoutes);


module.exports = router;