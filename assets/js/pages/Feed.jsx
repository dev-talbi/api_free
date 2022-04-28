import React, {useEffect, useState} from "react";
import Axios from "axios";

const Feed = () => {

    const [ stories, setStories ] = useState([]);
    useEffect(() => {
        Axios
            .get("https://localhost:8000/api/stories?")
            .then(response => response.data['hydra:member'])
            .then(data => setStories(data))

    }, [])
    return (
        <div className={"container"}>
            {stories.map(stories =>   <div className="card mb-3">
                <div className={"card-body"}>
                    <div className={"d-flex justify-center"}>
                        <img className="mx-auto" src="http://placehold.jp/400x400.png" alt="Card image cap"/>
                    </div>
                    <p className="card-text text-center mt-5"> {stories.story}</p>
                </div>
            </div>)}

        </div>
    )
}

export default Feed