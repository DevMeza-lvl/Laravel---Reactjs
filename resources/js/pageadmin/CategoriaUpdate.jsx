import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Config from "../Config";
import AuthUser from "../pageauth/AuthUser";

const CategoriaUpdate = () => {
    const navigate = useNavigate();
    const { getToken } = AuthUser();
    const {id} = useParams();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [orden, setOrden] = useState("");
    const [menu, setMenu] = useState(false);
    const [urlfoto, setUrlfoto] = useState("foto.jpeg");
    const [file, setFile] = useState(null);

    const handleInputChange = async (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            setFile(e.target.result);
        }
    }

    useEffect(() => {
        const getCategoriaById = async () => {
            await Config.getCategoriaById(id, getToken())
                .then(({data}) => {
                    console.log(data);
                    setNombre(data.nombre);
                    setDescripcion(data.descripcion);
                    setOrden(data.orden);
                    setMenu(data.menu);
                    if(data.urlfoto){
                        setUrlfoto(data.urlfoto);
                    }
                });  
        };
        getCategoriaById(); 
    }, [])

    const submitUpdate = async (e) => {
        e.preventDefault();
        await Config.getCategoriaUpdate(id, {nombre, descripcion, orden, menu, file}, getToken())
        navigate('/admin/categoria');    }

    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-header">Editar Categoria</div>
                        <div className="card-body">
                            <form onSubmit={submitUpdate}>
                                <div className="form-group row">
                                    <div className="mt-3">
                                        <div className="form-check form-switch">
                                            <input type="checkbox" className="form-check-input" checked={menu} onChange={(e) => setMenu(!menu)} nombre="menu"></input>
                                            <label className="form-check-label" htmlFor="menu">Portada</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <label htmlFor="nombre">Nombre:</label>
                                        <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} nombre="nombre"></input>
                                    </div>
                                    <div className="col-sm-4">
                                        <label htmlFor="orden">Orden:</label>
                                        <input type="number" className="form-control" value={orden} onChange={(e) => setOrden(e.target.value)} nombre="orden"></input>
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="descripcion">Descripcion:</label>
                                        <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} nombre="descripcion"></input>
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="urlfoto">Imagen:</label>
                                        <img src={"/img/categorias/"+urlfoto} alt="" className="img-fluid img-thumbnail"></img>
                                        <input type="file" className="form-control" onChange={(e) => handleInputChange(e)} nombre="urlfoto"></input>
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
    
export default CategoriaUpdate