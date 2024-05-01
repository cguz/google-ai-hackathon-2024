const router = require('express').Router();
const GarmonyController = require('../../controllers/lyric.controllers');

//GET
router.get('/titles', GarmonyController.getTitles);
router.get('/', GarmonyController.getAll);
router.get('/:id', GarmonyController.getLyric);


//POST
router.post('/', GarmonyController.create);

//PUT
router.put('/:id', GarmonyController.update);

//DELETE
router.delete('/:id', GarmonyController.deleteById);

module.exports = router;