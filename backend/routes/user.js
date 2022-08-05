//-----------Importation des éléments----------
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//Route pour l'inscription d'un l'utilisateur
router.post('/signup', userCtrl.signup);
//Route pour la connexion de l'utilisateur déjà inscrit
router.post('/login', userCtrl.login);

module.exports = router;