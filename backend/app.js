const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const auth = require('../backend/middleware/auth');

const app = express();

mongoose.connect('mongodb+srv://TomFSC:0FiNlcrfKkJSFucc@cluster0.nuffh8m.mongodb.net/?retryWrites=true&w=majority',
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

app.post('/api/sauce', (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/sauce', (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
});


app.use('/api/auth', userRoutes);

module.exports = app;