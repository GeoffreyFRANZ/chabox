const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true // Génère automatiquement un ObjectId
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Veuillez entrer une adresse email valide.']
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'away'],
    default: 'offline'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('User', userSchema);



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
      required: true
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
  
  module.exports = mong
  