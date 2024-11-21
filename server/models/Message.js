const mongoose = require('mongoose');
const { Schema } = mongoose;



const messageSchema = new Schema({
    _id: {
      type: Schema.Types.ObjectId,
      auto: true // Génère automatiquement un ObjectId
    },
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Référence à la collection `users`
      required: true
    },
    receiver_id: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Référence à la collection `users`
      required: true
    },
    content: {
      type: String,
      required: true,
      maxLenght: 200
    },

    dateSent: {
      type: Date,
      default: Date.now
    },
    dateView: {
      type: Date,
      default: null // Par défaut, le message n'est pas vu
    }
  });
  
  module.exports = mongoose.model('Message', messageSchema);  