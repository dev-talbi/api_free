import React, {useContext, useState} from "react";
import AuthApi from "../services/AuthApi";
import AuthContext from "../contexts/AuthContext";
import {NavLink} from "react-router-dom";

const Login = ({history}) => {
    const {setIsAuthenticated} = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    // field manager
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget
        setCredentials({...credentials, [name]: value})
    }

    const [error, setError] = useState("");

    // submit manager
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await AuthApi.authenticate(credentials)
            setError("");
            setIsAuthenticated(true)
            history.replace("/feed")
        } catch (error) {
            setError("Aucun compte ne possède cette addresse ou alors les informations ne correspondent pas.")
        }
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                    <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={credentials.username}
                        onChange={handleChange}
                        id="username"
                        className={"fadeIn second mt-5 mb-4" + (error && " is-invalid")}
                        name="username"
                        placeholder="E-mail"
                    />
                    {error && <p className={"invalid-feedback"}>{error} </p>}
                    <input
                        type="password"
                        value={credentials.password}
                        onChange={handleChange}
                        id="password"
                        className="fadeIn third"
                        name="password"
                        placeholder="Mot de passe"
                    />
                    <button type="submit" className="fadeIn fourth mt-5 login">Connexion</button>
                </form>
                <div id="formFooter">
                    <NavLink className="underlineHover" to={"/register"}>Inscription</NavLink>
                </div>

            </div>
        </div>
    )
}

export default Login