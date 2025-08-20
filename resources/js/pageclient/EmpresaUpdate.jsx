import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Config from "../Config";
import AuthUser from "../pageauth/AuthUser";
import SelectCategorias from "../components/SelectCategorias";

const EmpresaUpdateClient = () => {
    const navigate = useNavigate();
    const { getToken } = AuthUser();
    const {id} = useParams();
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [orden, setOrden] = useState(0)
    const [descripcion, setDescripcion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [direccion, setDireccion] = useState("")
    const [website, setWebsite] = useState("")
    const [facebook, setFacebook] = useState("")
    const [youtube, setYoutube] = useState("")
    const [x, setX] = useState("")
    const [urlfoto, setUrlfoto] = useState("foto.jpeg");
    const [categoria_id, setCategoria_id] = useState("")
    const [file, setFile] = useState("")

    useEffect(() => {
        const _getEmpresaById = async () => {
            await Config.getEmpresaByIdClient(id, getToken())
                .then(({data}) => {
                    console.log(data);
                    setNombre(data.nombre);
                    setEmail(data.email);
                    setOrden(data.orden);
                    setTelefono(data.telefono);
                    setDireccion(data.direccion);
                    if(data.descripcion){ 
                        setDescripcion(data.descripcion);
                    }
                    if(data.website){
                        setWebsite(data.website);
                    }
                    if(data.facebook){
                        setFacebook(data.facebook);
                    }
                    if(data.youtube){
                        setYoutube(data.youtube);
                    }
                    if(data.x){
                        setX(data.x);
                    }
                    if(data.categoria_id){ 
                        setCategoria_id(data.categoria_id);
                    }
                    if(data.urlfoto){
                        setUrlfoto(data.urlfoto);
                    }
                });  
        };
        _getEmpresaById(); 
    }, [])

    const getCategoriaId = (e) => {
        setCategoria_id(e)
    }
    
    const submitUpdate = async (e) => {
        e.preventDefault();
        await Config.getEmpresaUpdateClient(id, {nombre, email, orden, descripcion, telefono, direccion, website, facebook, youtube, x , file, categoria_id}, getToken())
        navigate('/client/empresa');
    }

    const handleInputChange = async (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            setFile(e.target.result);
        }
    }

    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={submitUpdate}>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <label>Nombre:</label>
                                        <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Email:</label>
                                        <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Teléfono:</label>
                                        <input type="number" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <label>Direccion:</label>
                                        <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Orden:</label>
                                        <input type="number" className="form-control" value={orden} onChange={(e) => setOrden(e.target.value)} />
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Categoria:</label>
                                        <SelectCategorias data={categoria_id} selected={getCategoriaId}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-3">
                                        <label>Website: </label>
                                        <input type="url" className="form-control" value={website} onChange={(e) => setWebsite(e.target.value)} />
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Facebook: </label>
                                        <input type="url" className="form-control" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Youtube: </label>
                                        <input type="url" className="form-control" value={youtube} onChange={(e) => setYoutube(e.target.value)} />
                                    </div>
                                    <div className="col-sm-3">
                                        <label>X: </label>
                                        <input type="url" className="form-control" value={x} onChange={(e) => setX(e.target.value)} />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label>Descripcion:</label>
                                    <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                </div>
                                <div className="mt-3">
                                    <label>Imagen: </label>
                                    <img src={"/img/empresa/"+urlfoto} alt="" className="img-fluid img-thumbnail"></img>
                                    <input type="file" className="form-control" onChange={(e) => handleInputChange(e)} nombre="urlfoto"></input>
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
    
export default EmpresaUpdateClient