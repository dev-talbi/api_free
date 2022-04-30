import React, {useEffect, useState} from "react";
import Axios from "axios";

const Feed = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        Axios
            .get("https://localhost:8000/api/stories?")
            .then(response => response.data['hydra:member'])
            .then(data => setStories(data))
            .catch(error => console.log(error.message))
    }, [])


    return (
        <div className={"container"}>
            {stories.map(stories => <div className="card mb-3">
                <div className={"card-body"}>
                    <div className={"mb-5"}>
                        Publier par : {stories.user.Firstname} le : {'\u00A0'}
                        {new Date(stories.Created_at).toLocaleDateString("fr")}
                    </div>
                    <div className={"d-flex justify-center"}>
                        <img className="mx-auto" src="http://placehold.jp/400x400.png" alt="Card image cap"/>
                    </div>
                    <div>
                        <p className="card-text text-center mt-5 mb-5"> {stories.story}</p>
                    </div>
                    {
                        stories['reviews'].length ? <h3 className={"mb-3"}>Commentaire :</h3> :
                            <p>Pas de commentaire.</p>
                    }
                    {stories['reviews'].map(result =>
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className={"mb-3"}>De {result.author.Firstname} {result.author.Lastname}</div>
                                {result.review}
                            </div>
                        </div>
                    )}
                    {stories.Updated_at ? (
                        "Mis à jour le : " +
                        new Date(stories.Updated_at).toLocaleDateString("fr", {hour: 'numeric', minute: 'numeric'})

                    ) : (
                        ""
                    )}
                </div>
            </div>)}
        </div>
    )
}

export default Feed