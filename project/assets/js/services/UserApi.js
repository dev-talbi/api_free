import Axios from "axios";

function findAll() {
    return Axios
        .get("https://localhost:8000/api/users")
        .then(response => response.data["hydra:member"])
}

export default {
    findAll
}