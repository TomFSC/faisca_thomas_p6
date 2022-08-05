//--------Importation des éléments----------
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const encodingKey = process.env.TOKEN_ENCODING_KEY;

module.exports = (req, res, next) => {
    try {
        //On récupère le token dans le headers 
        const token = req.headers.authorization.split(' ')[1];
        //On décode le token récupéré
        const decodedToken = jwt.verify(token, 'encodingKey');
        //On récupère le userId dans le token décodé
        const userId = decodedToken.userId;
        //On transmet le userId a la requète pour la gestion de route et les middlewares
        req.auth = {
            userId: userId
        };
    next();
    }
    catch (error) {
        res.status(401).json({ error });
    }
};