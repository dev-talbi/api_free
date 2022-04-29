import React, {useContext} from "react";
import AuthApi from "../services/AuthApi";
import {NavLink} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Navbar = ({history}) => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

    const handleLogout = () => {
        AuthApi.logout();
        setIsAuthenticated(false)
        history.push("/login")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={"/"}>Free API</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to={"/feed"}>FEED
                                <span className="visually-hidden">(current)</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Perso</a>
                        </li>
                    </ul>
                    <ul className={"navbar-nav ml-auto"}>
                        {(!isAuthenticated && (<>
                            <li className={"nav-item mx-auto"}>
                                <NavLink to={"/register"} className={"btn btn-info"}>
                                    Inscription
                                </NavLink>
                            </li>
                            <li className={"nav-item"}>
                                <NavLink to={"/login"} className={"btn btn-success"}>
                                    Connexion
                                </NavLink>
                            </li>
                        </>)) || (
                            <li className={"nav-item"}>
                                <button onClick={handleLogout} href={"#"} className={"btn btn-danger"}>
                                    Déconexion
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;