import React, { useEffect } from "react";
import Config from "../Config";
import AuthUser from "../pageauth/AuthUser";

const SelectCategorias = ({data, selected}) => {
    const { getToken } = AuthUser();
    const [options, setOptions] = React.useState([]);
    
    useEffect(() => {
        getOptions();
    }, [])

    const getOptions = async() => {
        const response = await Config.getCategoriaAll(getToken());
        console.log(response.data)
        setOptions(response.data);
    }

    return (
        <select value={data} className="form-control" onChange={(e) => {selected(e.target.value)}}>
            {
                options.map((option) => (
                    <option key={option.id} value={option.id}>{option.nombre}</option>
                ))
            }
        </select>
    )
}

export default SelectCategorias