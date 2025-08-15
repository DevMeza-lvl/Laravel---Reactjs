import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Config from "../Config";
import AuthUser from "../pageauth/AuthUser";
import { Link } from "react-router-dom";

const CategoriaAll = function(){
    const { getToken } = AuthUser();
    const [categorias, setCategorias] = useState()

    useEffect(() => {
        _getCategoriaAll()
    }, [])

    const _getCategoriaAll = async () => {
        const response = await Config.getCategoriaAll(getToken())
        console.log(response.data)
        setCategorias(response.data)
    }

    const _deleteCategoriaById = async (id) => {
        const isDelete = window.confirm('Estas Seguro que Desea Eliminar la Categoría?')
        if(!isDelete) return
        await Config.getCategoriaDeleteById(id, getToken())
        _getCategoriaAll()
    }

    return(
        <div className="container bg-light">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <Link to="/admin/categoria/create" className="btn btn-primary">Agregar</Link>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    !categorias ? <tr><td colSpan={3}>Cargando...</td></tr> : categorias.map((categoria) => (
                                        <tr key={categoria.id}>
                                            <td>{categoria.orden}</td>
                                            <td>{categoria.nombre}</td>
                                            <td>
                                                <Link to={`/admin/categoria/edit/${categoria.id}`} className="btn btn-primary">Editar</Link>
                                                <button className="btn btn-danger" onClick={() => _deleteCategoriaById(categoria.id)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
    
export default CategoriaAll