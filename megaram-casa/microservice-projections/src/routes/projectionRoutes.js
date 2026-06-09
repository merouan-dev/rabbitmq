const express = require('express');
const router = express.Router();
const projectionController = require('../controllers/projectionController');

router.get('/', projectionController.getFilms);
router.get('/planning', projectionController.getPlanning);

module.exports = router;
