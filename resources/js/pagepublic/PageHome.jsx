import React, { useEffect } from "react";
import Config from "../Config";
import Modal from "../components/Modal";

const PageHome = () => {
    const [empresas, setEmpresas] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [datamodal, setDataModal] = React.useState([]);
    
    useEffect(() => {
        getEmpresas()
    }, [])

    const getEmpresas = async() => {
        const response = await Config.getEmpresaAllPublic(5);
        console.log(response.data);
        setEmpresas(response.data);
    }

    const search = async(e) => {
        const response = await Config.searchEmpresas({text:e});
        console.log(response.data);
        setEmpresas(response.data);
    }

    const showModal = (e, empresa) => {
        e.preventDefault();
        setModal(true);
        setDataModal(empresa);
        console.log(empresa);
    }


    return (
        <div className="container pt-5 pb-5">
            <div className="row justify-content-center">
                <div className="col-sm-8">
                    <h2 className="text-center">Empresas</h2> 
                    <div className="card">
                        <div className="card-body">
                            <p className="text-center mt-5">Buscador</p>
                            <input type="search" placeholder="Ingrese el nombre de una Empresa" className="form-control" onKeyDown={(e) => {if (e.key === "Enter") {search(e.target.value);}}}/>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {
                                empresas.map((empresa) => {
                                    return (
                                        <div className='mt-3' key={empresa.id}>
                                            <div className="card-body">
                                                <h2 className="fw-bolder">
                                                    <a href="#" onClick={(e) => showModal(e, empresa)}>{empresa.nombre}</a>
                                                </h2>
                                                <p>{empresa.descripcion}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                modal && <Modal datamodal={datamodal} close={setModal}/>
                            }
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default PageHome;