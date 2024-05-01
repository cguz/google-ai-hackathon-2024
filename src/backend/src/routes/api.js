const router = require('express').Router();

// Rutass
router.use('/v1/garmony', require('./api/garmony'));

module.exports = router;