const mongoose = require('mongoose');
const User = require('./models/User');
const Message = require('./models/Message');
require('dotenv').config(); // Charger les variables d'environnement


// Connexion à MongoDB
const dbURI = process.env.MONGO_URI; // Remplacez par votre URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.log('Erreur de connexion à MongoDB :', err));

// Exemple de données
async function seedDatabase() {
  try {
    //MP - Verifier si la BDD est vide
    let testUser = User.find();
    //MP - Si base vide
    if (testUser && testUser.count() == 0) {
      // Insérer des utilisateurs
      const user1 = await User.create({
        nom: 'john',
        prenom: 'doe',
        email: 'john.doe@example.com',
        password: 'azerty',
        status: 'online'
      });
      const user2 = await User.create({
        nom: 'jojo',
        prenom: 'doe',
        email: 'john@example.com',
        password: 'azerty',
        status: 'online'
      });
    }

    //MP - Verifier si la BDD est vide
    let testMessage = User.find();
    //MP - Si base vide
    if (testMessage && testMessage.count() == 0) {
      // Insérer des messages
    await Message.create({
      sender_id: user1._id,
      receiver_id: user2._id,
      content: 'Hello, how are you?',
      message_type: 'text',
      dateSent: new Date()
    });

    await Message.create({
      sender_id: user2._id,
      receiver_id: user1._id,
      content: "I'm good, thanks! What about you?",
      dateSent: new Date(),
      dateView: new Date()
    });
    }
    
    console.log('Données insérées avec succès.');
    process.exit();
  } catch (err) {
    console.error('Erreur lors de l’insertion des données :', err);
    process.exit(1);
  }
}

// Appeler la fonction pour insérer les données
seedDatabase();
