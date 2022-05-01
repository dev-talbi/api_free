import React, {useContext, useEffect, useState} from "react";
import Axios from "axios";
import jwtDecode from "jwt-decode";

const AddStory = ({history, match}) => {
    const token = window.localStorage.getItem("authToken");
    const userId = "/api/users/" + jwtDecode(token).id;
    const [editing, setEditing] = useState(false);
    const {id = "new"} = match.params;

    const [story, setStory] = useState({
        story: "",
        picture: "",
        user: userId,
    })

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setStory({...story, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = "https://localhost:8000/api/stories/"+id
        try {
            if (editing){
                const response = await Axios.put("https://localhost:8000/api/stories/"+id, story);
                document.querySelector(".green-alert").style.display="block";
            }else {
                const response = await Axios.post("https://localhost:8000/api/post-story", story);
                history.replace('/feed')
            }

        } catch (error) {
            console.log({story});
            console.log(error.response)
        }
    }

    const fetchStory = async id => {
        try {
            const data = await Axios.get("https://localhost:8000/api/stories/" + id)
                .then(response => response.data)
            const {story, picture, user } = data
            setStory({story, picture, user: "api/users/"+user.id});
            console.log(story)

        } catch (error) {
            console.log(error.response)
        }

    }

    useEffect(() => {
        if (id !== "new") {
            fetchStory(id);
            setEditing(true);
        }

    }, [id])

    return (
        <div className="container">
            <div className="alert green-alert alert-dismissible alert-success">
                <p className={"text-center"}>Modification réussie ! </p>
            </div>
            <div className="row">
                <div className="">
                    {
                        editing &&
                        <legend className="text-center mb-5">Modifier votre histoire</legend>

                        ||
                        <legend className="text-center mb-5">Ajouter une histoire</legend>
                    }
                    <form onSubmit={handleSubmit} role="form" method="POST" action="#">
                        <div className={"d-flex  align-items-center flex-column"}>
                            <div className={"mb-5 width-100 d-flex justify-content-center"}>
                                <input onChange={handleChange} value={story.picture} name={"picture"} type={"text"}
                                       placeholder={"Lien de votre image"}/>
                            </div>
                            <div className={"width-100 d-flex justify-content-center"}>
                                <textarea
                                    onChange={handleChange}
                                    value={story.story}
                                    placeholder={"Votre histoire ici"}
                                    name={"story"}>
                                </textarea>
                            </div>
                        </div>
                        <div className="form-group mt-5">
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary d-flex mx-auto">
                                    Ajouter
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default AddStory;