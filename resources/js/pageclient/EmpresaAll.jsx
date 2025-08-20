import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Config from "../Config";
import AuthUser from "../pageauth/AuthUser";
import { Link } from "react-router-dom";

const EmpresaAll = function(){
    const { getToken } = AuthUser();
    const [empresas, setEmpresas] = useState()

    useEffect(() => {
        _getEmpresaAll()
    }, [])

    const _getEmpresaAll = async () => {
        const response = await Config.getEmpresaAllClient(getToken())
        console.log(response.data)
        setEmpresas(response.data)
    }

    const _deleteCategoriaById = async (id) => {
        const isDelete = window.confirm('Estas Seguro que Desea Eliminar la Empresa?')
        if(!isDelete) return
        await Config.getEmpresaDeleteByIdClient(id, getToken())
        _getEmpresaAll()
    }

    return(
        <div className="container bg-light">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <Link to="/client/empresa/create" className="btn btn-primary">Agregar</Link>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Orden</th>
                                        <th>Nombre</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    !empresas ? <tr><td colSpan={3}>Cargando...</td></tr> : empresas.map((empresa) => (
                                        <tr key={empresa.id}>
                                            <td>{empresa.orden}</td>
                                            <td>{empresa.nombre}</td>
                                            <td>
                                                <Link to={`/client/empresa/edit/${empresa.id}`} className="btn btn-primary">Editar</Link>
                                                <button className="btn btn-danger" onClick={() => _deleteCategoriaById(empresa.id)}>Eliminar</button>
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
    
export default EmpresaAll