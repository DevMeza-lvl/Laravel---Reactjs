import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Outlet} from "react-router-dom";

const LayoutPublic = () => {
    return (
        <div>
            <h1>Publico</h1>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default LayoutPublic;