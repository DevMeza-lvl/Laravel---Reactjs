import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Config from "../Config";
import AuthUser from "../pageauth/AuthUser";
import { Link , useNavigate} from "react-router-dom";
import SelectCategorias from "../components/SelectCategorias";

const EmpresaStoreClient = function(){
    const { getToken } = AuthUser();
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
    const [urlfoto, setUrlfoto] = useState("")
    const [categoria_id, setCategoria_id] = useState()
    const navigate = useNavigate();

    const handleInputChange = async (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            setUrlfoto(e.target.result);
        }
    }

    const getCategoriaId = (e) => {
        setCategoria_id(e)
    }

    const submitStore = async (e) => {
        e.preventDefault();
        await Config.getEmpresaStoreClient(getToken(), {nombre, email, orden, descripcion, telefono, direccion, website, facebook, youtube, x , urlfoto, categoria_id})
        navigate('/client/empresa');
    }

    return(
        <div className="container bg-light">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={submitStore}>
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
                                        <SelectCategorias selected={getCategoriaId} getToken={getToken} />
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
                                    <input type="file" className="form-control" onChange={(e) => handleInputChange(e)} />
                                </div>
                                <div className="btn-group mt-3">
                                    <Link to={-1} className="btn btn-secondary">Cancelar</Link>
                                    <button type="submit" className="btn btn-primary">Crear Empresa</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
    
export default EmpresaStoreClient