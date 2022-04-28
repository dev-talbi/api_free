import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Free API</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">FEED
                                <span className="visually-hidden">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Perso</a>
                        </li>
                    </ul>
                    <ul className={"navbar-nav ml-auto"}>
                        <li className={"nav-item mx-auto"}>
                            <a href={"#"} className={"btn btn-info"}>
                                Inscription
                            </a>
                        </li>
                        <li className={"nav-item"}>
                            <a href={"#"} className={"btn btn-success"}>
                                Connexion
                            </a>
                        </li>
                        <li className={"nav-item"}>
                            <a href={"#"} className={"btn btn-danger"}>
                                Déconexion
                            </a>
                        </li>


                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;