const router = require('express').Router();

// Rutass
router.use('/v1/garmony/lyric', require('./api/lyric'));

module.exports = router;