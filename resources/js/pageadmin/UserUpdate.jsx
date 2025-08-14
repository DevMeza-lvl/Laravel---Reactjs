import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Config from "../Config";
import AuthUser from "../pageauth/AuthUser";

const UserUpdate = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [aprobado, setAprobado] = useState(false);
    const [name, setName] = useState("");
    const { getToken } = AuthUser();

    useEffect(() => {
        const getUserById = async () => {
            await Config.getUserById(id, getToken())
                .then(({data}) => {
                    console.log(data);
                    setName(data.name);
                    setAprobado(data.aprobado);
                });  
        };
        getUserById(); 
    }, [])

    const submitUpdate = async (e) => {
        e.preventDefault();
        await Config.getUserUpdate(id, {name, aprobado}, getToken())
        navigate('/admin/user');    }

    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-header">Editar User</div>
                        <div className="card-body">
                            <form onSubmit={submitUpdate}>
                                <div className="col-sm-12">
                                    <label htmlFor="name">Nombre:</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} name="name"></input>
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <div className="form-check form-switch">
                                        <input checked={aprobado} className="form-check-input" value={name} onChange={(e) => setAprobado(!aprobado)} type="checkbox" name="aprobado" role="switch" id="aprobado"></input>
                                        <label className="form-check-label" htmlFor="name">Aprobado:</label>
                                    </div>
                                </div>
                                <div className="btn-group mt-3">
                                    <Link to={-1} className="btn btn-secondary">Cancelar</Link>
                                    <button type="submit" className="btn btn-primary">Actualizar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
    
export default UserUpdate