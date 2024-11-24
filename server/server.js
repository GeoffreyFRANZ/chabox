const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const User = require('./models/User');
const Message = require('./models/Message');
require('dotenv').config(); // Charger les variables d'environnement
// Initialiser l'application Express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
// Middleware
app.use(cors());
app.use(express.json());




// Connexion à MongoDB
// URI de la base de données (local ou MongoDB Atlas)
const mongoURI = process.env.MONGO_URI; // Remplacez par votre URI

// Connexion à MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));


// API REST pour récupérer les messages
app.get('/api/messages', async (req, res) => {
  const { sender_id, receiver_id } = req.query;

  if (!sender_id || !receiver_id) {
    return res.status(400).json({ error: 'Les IDs de l\'expéditeur et du destinataire sont requis.' });
  }

  try {
    const messages = await Message.find({
      $or: [
        { sender_id, receiver_id },
        { sender_id: receiver_id, receiver_id: sender_id },
      ],
    });
        res.json(messages);
  } catch (err) {
    console.error('Erreur lors de la récupération des messages :', err);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});



app.get('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;

  console.log("Requête reçue pour récupérer l'utilisateur avec ID :", userId);

  // Vérifier si l'ID est valide pour MongoDB
  const mongoose = require('mongoose');
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error("ID utilisateur invalide :", userId);
    return res.status(400).json({ error: 'ID utilisateur invalide.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("Utilisateur non trouvé pour ID :", userId);
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    console.log("Utilisateur trouvé :", user);
    res.json(user);
  } catch (err) {
    console.error('Erreur interne lors de la récupération de l\'utilisateur :', err);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});




// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté:', socket.id);

  // Recevoir un nouveau message
  socket.on('sendMessage', async (messageData) => {
    try {
      const newMessage = new Message(messageData);
      await newMessage.save();

      // Émettre le message à l'autre utilisateur
      io.to(messageData.receiver_id).emit('receiveMessage', newMessage);
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message:', err);
    }
  });

  // Mettre à jour l'état "vu" des messages
  socket.on('markAsRead', async ({ sender_id, receiver_id }) => {
    try {
      await Message.updateMany(
        { sender_id: receiver_id, receiver_id: sender_id, dateView: null },
        { $set: { dateView: new Date() } }
      );
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'état des messages:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté:', socket.id);
  });
});

// Démarrer le serveur
const PORT = 5000;
server.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
