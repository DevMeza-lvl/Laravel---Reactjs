import React, { useEffect } from "react";
import Config from "../Config";

const PageHome = () => {
    const [empresas, setEmpresas] = React.useState([]);
    
    useEffect(() => {
        getEmpresas()
    }, [])

    const getEmpresas = async() => {
        const response = await Config.getEmpresaAllPublic(5);
        console.log(response.data);
        setEmpresas(response.data);
    }


    return (
        <div className="container pt-5 pb-5">
            <div className="row justify-content-center">
                <div className="col-sm-8">
                    <h2 className="text-center">Empresas</h2>
                    <div className="card">
                        <div className="card-body">
                            {
                                empresas.map((empresa) => {
                                    return (
                                        <div className='mt-3' key={empresa.id}>
                                            <div className="card-body">
                                                <h2 className="fw-bolder">{empresa.nombre}</h2>
                                                <p>{empresa.descripcion}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default PageHome;