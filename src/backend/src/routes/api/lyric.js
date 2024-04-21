const router = require('express').Router();
const LyricController = require('../../controllers/lyric.controllers');

//GET
router.get('/', LyricController.getAll);
router.get('/:id', LyricController.getLyric);

//POST
router.post('/', LyricController.create);

//PUT
router.put('/:id', LyricController.update);

//DELETE
router.delete('/:id', LyricController.deleteById);

module.exports = router;