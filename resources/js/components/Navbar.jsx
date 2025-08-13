import React from "react";
import Config from "../Config";
import AuthUser from "../pageauth/AuthUser";

const Navbar = () => {
    const {getRol, getLogout, getToken} = AuthUser();

    const logoutUser = () => {
        Config.getLogout('/logout')
        .then(response=>{
            console.log(response)
            getLogout();    
        }); 
    };

    const renderLinks = () => {
        if (getToken()) {
            return (
                <>
                    <li className="nav-item">
                        <a className="nav-link" href={`/${getRol()}`}>Administración</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={logoutUser}>Logout</a>
                    </li>
                </>
            );
        }else{
            return (
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>
            );
        }
    };
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">Sistemats</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/categorias">Categorias</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {renderLinks()}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;