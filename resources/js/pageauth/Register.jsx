import React, { useState } from "react";
import Config from "../Config";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import { useEffect } from "react";


const Register = () => {
    const {getToken} = AuthUser();
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(getToken()){
            navigate('/')
        }
    }, [])

    const submitRegistro = async(e) => {
        e.preventDefault();

        Config.getRegister({name, email, password})
        .then(({data}) => {
            if(data.success){
                navigate('/login')
            }
        });
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-4">
                    <div className="card mt-5 mb-5">
                        <div className="card-body">
                            <h1>Registro</h1>
                            <input type="text" placeholder="Nombre" className="form-control" onChange={(e) => setName(e.target.value)} required/>
                            <input type="text" placeholder="Correo" className="form-control mt-3" onChange={(e) => setEmail(e.target.value)} required/>
                            <input type="password" placeholder="Contraseña" className="form-control mt-3" onChange={(e) => setPassword(e.target.value)} required/>
                            <button className="btn btn-primary w-100 mt-3" onClick={submitRegistro} >Registrar</button>
                            <p className="small text-decoration-none mt-3">¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></p>
                            <p className="small text-decoration-none mt-3">¿Olvidaste tu contraseña? <a href="/forgot-password">Recuperar contraseña</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;