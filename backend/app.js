const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();
const databaseUsername = process.env.DATABASE_USERNAME;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseUrl = process.env.DATABASE_URL;

mongoose.connect('mongodb+srv://' + databaseUsername + ':' + databasePassword + databaseUrl,
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log( 'Connexion à MongoDB réussie !' ))
.catch(() => console.log( 'Connexion à MongoDB échouée !' ));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;