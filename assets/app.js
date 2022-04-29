import React, { useState} from "react";
import ReactDom from "react-dom"
import './styles/app.css';
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import './bootstrap';
import Navbar from "./js/components/Navbar";
import Home from "./js/pages/Home";
import Login from "./js/pages/Login";
import Feed from "./js/pages/Feed";
import AuthApi from "./js/services/AuthApi";
import AuthContext from "./js/contexts/AuthContext";
import PrivateRoute from "./js/components/PrivateRoute";
import Register from "./js/pages/Register";

AuthApi.setup();



const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated());
    const NavbarWithRouter = withRouter(Navbar)

    return (
        <AuthContext.Provider value={{
            isAuthenticated ,
            setIsAuthenticated
        }}>
            <HashRouter>
                <NavbarWithRouter/>
                <div className={"pt-5"}>
                    <Switch>
                        <Route path={"/login"} component={Login}/>
                        <Route path={"/register"} component={Register}/>
                        <PrivateRoute path={"/feed"} component={Feed}/>
                        <PrivateRoute path={"/"} component={Home}/>
                    </Switch>
                </div>
            </HashRouter>
        </AuthContext.Provider>
    )
}

const rootElement = document.querySelector("#app")
ReactDom.render(<App/>, rootElement)