import React, { useEffect, useState } from 'react';
import Chat from './chat'; // Adjust the path based on your project structure
import '../home.css';
import axios from "axios"; // Import the CSS file

function Home() {
    const [data, setData] = useState([]);
    const [correspondence, setCorrespondence] = useState([]);

    const searchSeller = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        if (searchTerm.length === 0) {
            const newCorrespondence = data.map(vendeur => ({
                name: vendeur.nom,
                lastname: vendeur.prenom.toLowerCase(),
            }));
            setCorrespondence(newCorrespondence);

        } else {
            const newCorrespondence = data
                .filter(vendeur => vendeur.nom.toLowerCase().includes(searchTerm))
                .map(vendeur => ({
                    name: vendeur.nom.toLowerCase(),
                    lastname: vendeur.prenom.toLowerCase(),
                }));
            setCorrespondence(newCorrespondence);
        }
        console.log(correspondence)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/');
                setData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="left-column">
                <h1>Bienvenue sur votre espace utilisateur</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                    Explorez les fonctionnalités disponibles sur cette plateforme. Commencez une conversation ou
                    naviguez dans les autres sections.
                </p>
                <input onChange={searchSeller} id='search' type="text"/>
                <div id="list">
                    <ul>
                        {correspondence.map((vendeur, index) => (
                            // console.log(vendeur)
                            <li key={index}>
                                <span>{vendeur.name} </span>
                                 {/*<span className={'btn btn-light'} onClick={() => addToTheList(vendeur)}>Ajouter</span>*/}
                             </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="right-column">
                <Chat/>
            </div>
        </div>
    );
}

export default Home;