import React from 'react';
import Chat from './chat'; // Adjust the path based on your project structure
import '../home.css'; // Import the CSS file

function Home() {
  return (
    <div className="container">
      {/* Left Column */}
      <div className="left-column">
        <h1>Bienvenue sur votre espace utilisateur</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Explorez les fonctionnalités disponibles sur cette plateforme. Commencez une conversation ou naviguez dans les autres sections.
        </p>
      </div>

      {/* Right Column with Chat */}
      <div className="right-column">
        <Chat />
      </div>
    </div>
  );
}

export default Home;
