import React from "react";
import ReactDom from "react-dom"
// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import {HashRouter, Switch, Route} from "react-router-dom";

// start the Stimulus application
import './bootstrap';
import Navbar from "./js/components/Navbar";
import Home from "./js/pages/Home";
import Login from "./js/pages/Login";
import Feed from "./js/pages/Feed";


console.log("webpack ok")

const App = () => {
    return <HashRouter>
        <Navbar/>
        <div className={"pt-5"}>
            <Switch>
                <Route path={"/login"} component={Login}/>
                <Route path={"/feed"} component={Feed}/>
                <Route path={"/"} component={Home}/>
            </Switch>
        </div>
    </HashRouter>
}

const rootElement = document.querySelector("#app")
ReactDom.render(<App/>, rootElement)