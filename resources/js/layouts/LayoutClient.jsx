import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Outlet} from "react-router-dom";
import AuthUser from "../pageauth/AuthUser";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LayoutClient = () => {
    const {getRol} = AuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        if(getRol() != 'client') {
            navigate('/')
        }
    }, [])

    return (
        <div>
            <h1>Cliente</h1>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default LayoutClient;