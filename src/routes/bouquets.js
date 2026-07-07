const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bouquetsController');
const validateBody = require('../middleware/validateBody');
const upload = require('../middleware/upload');
const { createBouquetSchema, updateBouquetSchema, favoriteSchema } = require('../schemas/bouquetSchemas');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', validateBody(createBouquetSchema), ctrl.create);
router.put('/:id', validateBody(updateBouquetSchema), ctrl.update);
router.delete('/:id', ctrl.remove);
router.patch('/:id/favorite', validateBody(favoriteSchema), ctrl.updateFavorite);
router.patch('/:id/photo', upload.single('photo'), ctrl.updatePhoto);

module.exports = router;
