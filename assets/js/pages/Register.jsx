import React, {useState} from "react";
import Field from "../form/field";
import Axios from "axios";

const Register = () => {
    const [register, setRegister] = useState({
        Firstname: "",
        Lastname: "",
        password: "",
        email: "",
    })

    const [errors, setErrors] = useState({
        Firstname: "",
        Lastname: "",
        password: "",
        email: "",
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setRegister({... register, [name]: value})
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios.post("https://localhost:8000/api/users", register)

            document.querySelector(".green-alert").style.display="block"

        }catch (error){
            if(error.response.data.violations){
                const apiErrors = {};
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                } );
                setErrors(apiErrors);
            }

        }
    }

    return (
        <div className="container">
            <div className="alert alert-dismissible alert-success green-alert">
                Inscription réussie
            </div>
            <div className="row">

                <div className="">
                    <legend className="text-center mb-5">Inscription</legend>
                    <form onSubmit={handleSubmit} role="form" method="POST" action="#">
                        <fieldset id={"#container_register"}>
                            <div className="form-group ">
                                <Field type="text" className="form-control" name="Firstname" id="first_name"
                                       value={register.Firstname}
                                       onChange={handleChange}
                                       error={errors.Firstname}
                                       placeholder="Prénom"/>
                            </div>
                            <div className="form-group">
                                <Field type="text" className="form-control" name="Lastname" id=""
                                       value={register.Lastname}
                                       onChange={handleChange}
                                       error={errors.Lastname}
                                       placeholder="Nom"/>
                            </div>
                            <div className="form-group">
                                <Field name={"email"} type="email" className="form-control" id=""
                                       value={register.email}
                                       onChange={handleChange}
                                       error={errors.email}
                                       placeholder="Email"/>
                            </div>
                            <div className="form-group ">
                                <Field type="password" className="form-control" name="password" id="password"
                                       value={register.password}
                                       onChange={handleChange}
                                       error={errors.password}
                                       placeholder="Mot de passe"/>
                            </div>
                        </fieldset>
                        <div className="form-group mt-5">
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary d-flex mx-auto">
                                    Inscription
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    )
}

export default Register;