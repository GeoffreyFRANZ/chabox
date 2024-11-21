const mongoose = require('mongoose');
const express = require('express');
const app = express();
// const config = require('config');               // <<~~removed this
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Charger les variables d'environnement

// URI de la base de données (local ou MongoDB Atlas)
const mongoURI = process.env.MONGO_URI; // Remplacez par votre URI

// Connexion à MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));
