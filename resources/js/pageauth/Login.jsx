import React from "react";
import Config from "../Config";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import { useEffect } from "react";

const Login = () => {
    const {setToken, getToken} = AuthUser();
    const [message, setMessage] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const navigate = useNavigate();

    useEffect(() => {
            if(getToken()){
                navigate('/')
            }
        }, [])
    
    const submitLogin = async(e) => {
            e.preventDefault();
    
            Config.getLogin({email, password})
            .then(({data}) => {
                if(data.success){
                    setToken(data.user, data.token, data.user.roles[0].name);
                }else{
                    console.log(data.message);
                }
            });
        }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-4">
                    <div className="card mt-5 mb-5">
                        <div className="card-body">
                            <h1>Login</h1>
                            <input type="text" placeholder="Correo" className="form-control mt-3" onChange={(e) => setEmail(e.target.value)} required/>
                            <input type="password" placeholder="Contraseña" className="form-control mt-3" onChange={(e) => setPassword(e.target.value)} required/>
                            <button className="btn btn-primary w-100 mt-3" onClick={submitLogin} >Iniciar sesión</button>
                            <p className="text-center mt-3">{message}</p>
                            <button className="btn btn-primary w-100 mt-3" onClick={() => navigate('/register')}>Registrarme</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login