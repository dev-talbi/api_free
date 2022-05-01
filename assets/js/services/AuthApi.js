import Axios from "axios";
import jwtDecode from "jwt-decode";

function authenticate(credentials) {
    return Axios
        .post("https://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            // Save token in localStorage
            window.localStorage.setItem("authToken", token);
            // Add header with token inside to my request
            setAxiosToken(token);

            return true
        })
}

function logout() {
    // remove token from localStorage
    window.localStorage.removeItem("authToken")
    // remove token from axios header
    delete Axios.defaults.headers["Authorization"]
}

function setAxiosToken(token) {
    Axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const jwtData = jwtDecode(token)

        // Check if token is expired and set axios header auth if is not
        if (jwtData.exp * 1000 > new Date().getTime()) {
            setAxiosToken(token)
        }
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");

    // check if jwt token is not expired and if user is authenticated
    if (token) {
        const jwtData = jwtDecode(token)
        if (jwtData.exp * 1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated,
}