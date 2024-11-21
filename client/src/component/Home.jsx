import React from "react";
import "./Home.css"

function Home() {
  return (
   
    <div class="container">
        
        <div class="main">
            <header>
                <button class="new-message">Nouveau message</button>
                <h1>Tchat</h1>
                <p class="subtitle">Messagerie interne</p>
            </header>
            <div class="content">
                <h2>Quoi de neuf ?</h2>
                <h2>Messages non lus</h2>
                <div class="messages">
                    
                    <form class="message-form">
                        <label for="marine-message" class="status-label">
                            <span class="status green"></span> 
                        </label>
                        <input type="text" id="marine-message" name="marine-message" class="text-input" placeholder="Messages non lus">
                        </input>
                    </form>

                    
                    <form class="message-form">
                        <label for="bruno-message" class="status-label">
                            <span class="status red"></span> 
                        </label>
                        <input type="text" id="bruno-message" name="bruno-message" class="text-input" placeholder="Messages non lus">
                        </input>
                    </form>
                </div>
                
            </div>
        </div>

        
        <div class="sidebar">
            <div class="profile">
                <span class="star">⭐</span>
                <span class="username">Tristan</span>
            </div>
            <button class="button">Paramétrage</button>
            <button class="button">Se déconnecter</button>
            <div class="conversations">
                <h3>Mes conversations</h3>
                <div class="conversation active"></div>
                <div class="conversation"></div>
                <div class="conversation"></div>
            </div>
        </div>
    </div>


  );
}

export default Home;