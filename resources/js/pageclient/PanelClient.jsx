import React from "react";
import Sidebar from "./Sidebar";

const PanelClient = () => {
    return (
        <div className="container bg-light">
            <div className="row justify-content-center mt-5 mb-5">
                <Sidebar/>
                <div className="col-sm-9">
                    <h2 className="text-center">Cliente</h2>
                </div> 
            </div>
        </div>
    );
};

export default PanelClient;