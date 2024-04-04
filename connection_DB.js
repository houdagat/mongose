const mongoose = require('mongoose');

// Charger le fichier .env
const uri = process.env.MONGO_URI;

const connection_DB = () => {
  mongoose.connect(uri)
    .then(() => {
      console.log('Connecté à la base de données PersonDB');
    })
    .catch((err) => {
      console.error('Erreur de connexion à la base de données PersonDB:', err);
    });
}

module.exports = connection_DB;
