import React, { useEffect, useState } from "react";
import Config from "../Config";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const Categoria = () => {
    const {slug} = useParams();
    const [categoria, setCategoria] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [modal, setModal] = useState(false);
    const [datamodal, setDataModal] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getCategoria = async () => {
            await Config.CategoriaBySlug(slug).then(({data}) => {
                if(data!==null){
                    setCategoria(data.categoria);
                    if(data.empresas.length > 0){
                        setEmpresas(data.empresas);
                    }
                }else{
                    navigate("/")
                }
            });
        }
        getCategoria();
    }, [slug])

    const showModal = (e, empresa) => {
        e.preventDefault();
        setModal(true);
        setDataModal(empresa);
        console.log(empresa);
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-8">
                    <div className="card mt-5 mb-5">
                        <div className="card-body">
                            <h1>Empresas de {categoria.nombre}</h1>
                        </div>
                    </div>
                    {
                        empresas.map((empresa) => {
                            return (
                                <div className="mt-3" key={empresa.id}>
                                    <div className="card-body">
                                        <h2 className="fw-bolder">
                                            <a href="#" onClick={(e) => showModal(e, empresa)}>{empresa.nombre}</a>
                                        </h2>
                                        <p>{empresa.descripcion}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                    {
                        modal && <Modal datamodal={datamodal} close={setModal} />
                    }
                </div>
            </div>
        </div>
    );
};

export default Categoria;