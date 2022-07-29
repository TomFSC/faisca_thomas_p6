const jwt = require('jsonwebtoken');
const encodingKey = process.env.TOKEN_ENCODING_KEY;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'encodingKey');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
    next();
    }
    catch (error) {
        res.status(401).json({ error });
    }
};