import { now } from "mongoose";
import Message from "../models/Message";

//MP - Get tous les messages du conversation en fonction des locutteurs
module.exports.getMessages = async(query) => {
    try {
        return await Message.find(query);
    } catch(e) {
        throw Error("Erreur de récupération des messages d'une conversation.");
    }
}

//MP - Récupérer une message
module.exports.getMessage = async(query) => {
    try {
        return await Message.findOne(query);
    } catch(e) {
        throw Error("Erreur récupération de la message.");
    }
}

//MP - Créer une nouvelle message suite l'envoie d'une message dans Tchat
module.exports.createMessage = async(message) => {
    try {
        return await message.save();
    } catch(e) {
        throw Error("Erreur de sauvegarde de la message.");
    }
}

//MP - Marquer la message comme "lu"
module.exports.updateMessage = async(message) => {
    try {
        return await Message.updateOne({ "_id" : message._id }, {"dateView" : now()})
    } catch(e) {
        throw Error("Erreur d'update de la message comme lu.");
    }
}