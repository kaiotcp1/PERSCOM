const express = require('express');
const router = express.Router();
const ebController = require('../controller/ebController');


router.post('/register', ebController.createSoldier, ebController.register);
router.get('/register', ebController.register);
router.get('/list', ebController.getAll);
router.get('/list/:id', ebController.getId);
router.put('/update/:id', ebController.updateSoldier);
router.delete('/delete/:id', ebController.deleteSoldier);

module.exports = router;