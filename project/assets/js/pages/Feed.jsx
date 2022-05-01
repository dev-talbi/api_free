import React, {useEffect, useState} from "react";
import Axios from "axios";
import {NavLink} from "react-router-dom";
import jwtDecode from "jwt-decode";

const Feed = () => {
    const token = window.localStorage.getItem("authToken");
    const user = jwtDecode(token).id;
    const [stories, setStories] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [comment, setComment] = useState({
        review: "",
        story: "",
        author: "",
    });

    function handleChange(e, reviewData, storyData) {
        const userId = "/api/users/" + jwtDecode(token).id;
        reviewData = e.target.value;
        storyData = "/api/stories/" + e.target.id;
        setComment(({story: storyData, review: reviewData, author: userId}))
    }

    const handleDeleteStory = async (event) => {
        event.preventDefault();
        try {
            const id = event.target.id
            const url = "https://localhost:8000/api/stories/" + id
            const response = await Axios.delete(url)
            setToggle(prevState => !prevState)
            console.log(response)
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios
                .post("https://localhost:8000/api/reviews", comment)
            setToggle(prevState => !prevState)
            console.log(response);

        } catch (error) {
            console.log(error.response)
        }
    }

    const handleDeleteReview = async (event) => {
        event.preventDefault();
        try {
            const id = event.target.id
            console.log({id})
            const url = "https://localhost:8000/api/reviews/" + id
            const response = await Axios.delete(url)
            setToggle(prevState => !prevState)
            console.log(response)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        Axios
            .get("https://localhost:8000/api/stories?")
            .then(response => response.data['hydra:member'])
            .then(data => setStories(data))
            .catch(error => console.log(error.message))
    }, [toggle])


    return (
        <div className={"container"}>
            <div className={"d-flex justify-content-end alig mb-5"}>
                <NavLink to={"/add/story/new"} className="btn btn-primary btn-lg">Ajouter une histoire</NavLink>
            </div>
            {stories.map((stories, index) =>
                <div className="card mb-3" key={index}>
                    <div className={"mb-5 card-header d-flex"}>
                        <div>
                            Publier par : {stories.user.Firstname} le : {'\u00A0'}
                            {new Date(stories.Created_at).toLocaleDateString("fr")}
                        </div>
                        {
                            stories.user.id === user ?
                                <div className={"ml-auto d-flex"}>
                                    <div className={"mr-3"}>
                                        <NavLink to={"/add/story/" + stories.id}
                                                 className="btn btn-info">Éditer</NavLink>
                                    </div>
                                    <div>
                                        <button id={stories.id} onClick={handleDeleteStory}
                                                className="btn btn-primary">Supprimer
                                        </button>
                                    </div>
                                </div>
                                : ""
                        }
                    </div>
                    <div className={"card-body"}>
                        <div className={"d-flex justify-center"}>
                            <img className="mx-auto mw-400" src={stories.picture} alt="Card image cap"/>
                        </div>
                        <div>
                            <p className="card-text text-center mt-5 mb-5"> {stories.story}</p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <button className="btn btn-primary mb-3" type="button" data-toggle="collapse"
                                    data-target={"#collapseExample" + index} aria-expanded="true"
                                    aria-controls={"collapseExample" + index}>
                                Voir les commentaires
                            </button>
                        </div>
                        <div className={"collapse"} id={"collapseExample" + index}>
                            {stories['reviews'].map(result =>
                                <div className="card mb-3">
                                    {
                                        result.author.id === user ?
                                            <div className={"d-flex"}>
                                                <button id={result.id} onClick={handleDeleteReview}
                                                        className="btn btn-primary ml-auto mr-3 mt-2">Supprimer
                                                </button>
                                            </div>
                                            :
                                            ""
                                    }
                                    <div className="card-body">
                                        <div
                                            className={"mb-3"}>De {result.author.Firstname} {result.author.Lastname} </div>
                                        {result.review}
                                    </div>
                                </div>
                            )}
                            <div className={"containe-post-review"}>
                                <div className={"width-100 d-flex justify-content-center flex-column"}>
                                    <div className={"mb-3"}>
                                        <h3 className={"text-center"}>Ajouter un Commentaire : </h3>
                                    </div>
                                    <div className={"d-flex justify-content-center mb-3"}>
                                        <textarea
                                            onChange={handleChange}
                                            placeholder={"Votre commentaire ici"}
                                            name={"review"}
                                            id={stories.id}
                                        >
                                        </textarea>
                                    </div>
                                    <button onClick={handleSubmit} type="submit"
                                            className="btn btn-primary d-flex mx-auto">
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"card-footer"}>
                        {stories.Updated_at ? (
                            "Mis à jour le : " +
                            new Date(stories.Updated_at).toLocaleDateString("fr")
                        ) : (
                            ""
                        )}
                    </div>
                </div>)}
        </div>
    )
}

export default Feed