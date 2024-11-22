import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Connexion au serveur Socket.IO

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false); // État pour afficher ou masquer le slide
  const [receiverInfo, setReceiverInfo] = useState({});
  const senderId = '673f185e566300903a33ec29'; // ID de l'expéditeur
  const receiverId = '673f185e566300903a33ec2c'; // ID du destinataire

  useEffect(() => {
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);
  
    if (!receiverId || !senderId) {
      console.error("Sender ID ou Receiver ID manquant !");
      return;
    }
  
    // Charger les messages depuis l'API
    axios
      .get('http://localhost:5000/api/messages', {
        params: { sender_id: senderId, receiver_id: receiverId },
      })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des messages :', error);
      });
  
    // Charger les informations du destinataire
    axios
      .get(`http://localhost:5000/api/users/${receiverId}`)
      .then((response) => {
        setReceiverInfo(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des informations du destinataire :', error);
      });
  
    // Écouter les nouveaux messages via Socket.IO
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  
    return () => {
      socket.off('receiveMessage');
    };
  }, []);
  

  // Envoyer un message
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageData = {
        sender_id: senderId,
        receiver_id: receiverId,
        content: newMessage,
      };

      socket.emit('sendMessage', messageData); // Émettre un événement Socket.IO
      setMessages((prevMessages) => [...prevMessages, { ...messageData, dateSent: new Date() }]);
      setNewMessage('');
    }
  };

  // Marquer les messages comme lus
  useEffect(() => {
    socket.emit('markAsRead', { sender_id: senderId, receiver_id: receiverId });
  }, [messages]);

  return (
<div>
  {/* Bouton pour afficher ou masquer le slide */}
  <button
    style={{
      position: 'fixed',
      top: '20px',
      right: isOpen ? '20px' : '0',
      zIndex: 1000,
      background: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    }}
    onClick={() => setIsOpen(!isOpen)}
  >
    {!isOpen ? (
      <>
        <img
          src={receiverInfo?.profile_picture || 'https://via.placeholder.com/50'}
          alt="Profile"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            marginRight: '10px',
          }}
        />
        <div>
          <p style={{ margin: 0, fontWeight: 'bold' }}>
            {receiverInfo?.nom || 'Utilisateur inconnu'}
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: '#fff' }}>
            Statut : {receiverInfo?.isOnline ? 'En ligne' : 'Hors ligne'}
          </p>
        </div>
      </>
    ) : (
      <p style={{ margin: 0 }}>Fermer</p>
    )}
  </button>

      {/* Panneau coulissant */}
      <div
        style={{
          position: 'fixed',
          bottom: '20',
          right: isOpen ? '25%' : '-3020px',
          width: '75%',
          height: '100vh',
          backgroundColor: '#fff',
          boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.2)',
          transition: 'right 0.3s ease',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ padding: '10px', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>
          Conversation
        </div>
        <div
  style={{
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
  }}
>
  {messages.map((message) => (
    <div
      key={message._id || Math.random()}
      style={{
        textAlign: message.sender_id === senderId ? 'right' : 'left',
        marginBottom: '10px',
      }}
    >
      <p
        style={{
          display: 'inline-block',
          padding: '10px',
          borderRadius: '10px',
          backgroundColor: message.sender_id === senderId ? '#007bff' : '#f1f1f1',
          color: message.sender_id === senderId ? '#fff' : '#000',
        }}
      >
        {message.content}
      </p>
      <br />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: message.sender_id === senderId ? 'flex-end' : 'flex-start', gap: '5px' }}>
        <small style={{ fontSize: '10px', color: '#888' }}>
          {new Date(message.dateSent).toLocaleTimeString()}
        </small>
        {message.dateView ? (
          <span
            style={{
              fontSize: '12px',
              color: '#4caf50',
            }}
          >
            ✅ {/* Message viewed icon */}
          </span>
        ) : (
          <span
            style={{
              fontSize: '12px',
              color: '#888',
            }}
          >
            📩 {/* Message sent but not viewed icon */}
          </span>
        )}
      </div>
    </div>
  ))}
</div>
        <div style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{
              width: 'calc(100% - 22px)',
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              marginBottom: '10px',
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              width: '20%',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
            }}
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
