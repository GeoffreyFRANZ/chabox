const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Initialiser Express
const app = express();
app.use(cors()); // Autoriser les requêtes CORS

// Créer un serveur HTTP
const server = http.createServer(app);

// Initialiser Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // URL de votre frontend React
    methods: ["GET", "POST"],
  },
});

// Gérer les connexions Socket.IO
io.on('connection', (socket) => {
  console.log('Nouvelle connexion :', socket.id);

  // Écouter les messages entrants
  socket.on('send_message', (data) => {
    console.log('Message reçu :', data);

    // Émettre le message à tous les clients connectés
    io.emit('receive_message', data);
  });

  // Déconnexion
  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté :', socket.id);
  });
});

// Démarrer le serveur
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
