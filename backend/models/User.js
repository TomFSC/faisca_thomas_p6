//---------Importation des éléments-----------
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//Déclaration du schema mongoose pour l'utilisateur (modèle)
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);