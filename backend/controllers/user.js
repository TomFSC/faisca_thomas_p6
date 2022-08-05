//----------Importation des éléments-------------
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();
const encodingKey = process.env.TOKEN_ENCODING_KEY;

exports.signup = (req, res, next) => {
    //Hachage du mot de passe utilisateur avec 10 trs d'algorythme
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            //enrgistrement de l'utilisateur dans la BDD
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            //Si l'utilisateur n'existe pas (e-mail non valide)
            if (!user) {
                return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte !' });
            }
            //On compare le mot de passe de la requête avec celui stocké dans la BDD
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //Si les mot de passe sont différents
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte !' });
                    }
                    //Si mot de passe OK on retourne les informations d'authentification nécessaires au client pour ses différentes requête
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'encodingKey',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};