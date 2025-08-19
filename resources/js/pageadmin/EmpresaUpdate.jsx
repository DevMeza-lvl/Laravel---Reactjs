import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Config from "../Config";
import AuthUser from "../pageauth/AuthUser";

const EmpresaUpdate = () => {
    const navigate = useNavigate();
    const { getToken } = AuthUser();
    const {id} = useParams();
    const [nombre, setNombre] = useState("");
    const [orden, setOrden] = useState("");
    const [publicado, setPublicado] = useState(false);

    useEffect(() => {
        const _getEmpresaById = async () => {
            await Config.getEmpresaById(id, getToken())
                .then(({data}) => {
                    console.log(data);
                    setNombre(data.nombre);
                    setOrden(data.orden);
                    setPublicado(data.publicado);
                });  
        };
        _getEmpresaById(); 
    }, [])

    const submitUpdate = async (e) => {
        e.preventDefault();
        await Config.getEmpresaUpdate(id, {nombre,orden, publicado}, getToken())
        navigate('/admin/empresa');   
    }

    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-header">Editar Empresa</div>
                        <div className="card-body">
                            <form onSubmit={submitUpdate}>
                                <div className="form-group row">
                                    <div className="mt-3">
                                        <div className="form-check form-switch">
                                            <input type="checkbox" className="form-check-input" checked={publicado} onChange={(e) => setPublicado(!publicado)} nombre="menu"></input>
                                            <label className="form-check-label" htmlFor="publicado">Publicado</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <label htmlFor="nombre">Nombre:</label>
                                        <input type="text" className="form-control" disabled value={nombre} onChange={(e) => setNombre(e.target.value)} nombre="nombre"></input>
                                    </div>
                                    <div className="col-sm-4">
                                        <label htmlFor="orden">Orden:</label>
                                        <input type="number" className="form-control" value={orden} onChange={(e) => setOrden(e.target.value)} nombre="orden"></input>
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
    
export default EmpresaUpdate