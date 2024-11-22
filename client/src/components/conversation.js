import { useState } from 'react';
import icone from '../logo.svg';

const Conversation = () => {
    const receiverInfo = {
        profile_picture: icone,
        nom: "benazzouz",
        prenom: "ilane",
        isOnline: true
    }

    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <button
            className={ isOpen ? "badge-conversation open" : "badge-conversation"}
            onClick={() => setIsOpen(!isOpen)}
        >
            <img
                src={receiverInfo?.profile_picture || 'https://via.placeholder.com/50'}
                alt="Profile"
                className="user-profile-picture"
            />
            <div>
                <p className="user-name">
                    <span className="user-prenom">
                        {receiverInfo?.prenom || 'Utilisateur inconnu'}
                    </span>
                    <span className="user-nom">
                        {receiverInfo?.nom || 'Utilisateur inconnu'}
                    </span>
                    <span className={receiverInfo?.isOnline ? "online" : "offline"}></span>
                </p>
            </div>
        </button>
    )
}

export default Conversation;