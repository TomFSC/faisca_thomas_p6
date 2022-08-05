//-----------Importation des éléments---------
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

//Déclaration des variables d'environnement pour MongoDB
const databaseUsername = process.env.DATABASE_USERNAME;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseUrl = process.env.DATABASE_URL;

//Connection à la BDD MongoDB
mongoose.connect('mongodb+srv://' + databaseUsername + ':' + databasePassword + databaseUrl,
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log( 'Connexion à MongoDB réussie !' ))
.catch(() => console.log( 'Connexion à MongoDB échouée !' ));
//Utilisation de Express par l'application
app.use(express.json());

//Ajout des headers pour permettre à l'application d'accéder à l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Route pour les sauces
app.use('/api/sauces', sauceRoutes);
//Route pour les utilisateurs
app.use('/api/auth', userRoutes);
//Route pour les fichiers statiques vers le répertoire /images
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;