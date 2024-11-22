import { Outlet } from "react-router-dom";
import penguin from '../penguin.png';
import logo from '../logo.svg';
import MesConversations from './mesConversations';

const Layout = () => {
    const user = {
        prenom: "martina",
        nom: "polakova"
    }

    return (
        <>
            <header className="App-header">
                <img src={penguin} className="App-logo"></img>
                <div classNAme="App-label">
                    <h1 className="headerText">
                        Tchat
                    </h1>
                    <p>
                        Votre messagerie interne
                    </p>
                </div>
            </header>
            <div className="menu-right">
                <div className="user-info">
                    <img
                        src={logo}
                        alt="Profile"
                        className="user-profile-picture"
                    />
                    <p className="user-name">
                        <span className="user-prenom">{ user.prenom }</span>
                        <span className="user-nom">{ user.nom }</span>
                    </p>
                </div>
                <div className="divide-line"></div>
                <MesConversations/>
            </div>
            <Outlet />
        </>
    )
};

export default Layout;