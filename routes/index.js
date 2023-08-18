const router = require('express').Router();

router.use('/users', require('./userRoutes'));
router.use('/posts', require('./postRoutes'));

module.exports = router;
