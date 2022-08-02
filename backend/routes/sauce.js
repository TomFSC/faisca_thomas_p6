const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');
const userSauceAuth = require('../middleware/userSauceAuth');

router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth , userSauceAuth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, userSauceAuth, multer, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.addNotice);  //route pour la fonction like

module.exports = router;