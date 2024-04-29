// controllers/index.js

const router = require('express').Router();

const apiRoutes = require('./api')

const homeRoutes = require('./homeRoutes')
const authRoutes = require('./authRoutes')


router.use('/api', apiRoutes);

router.use('/', homeRoutes);
router.use('/', authRoutes);


module.exports = router;