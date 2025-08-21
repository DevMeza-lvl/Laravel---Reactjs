import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">404 Not Found</div>

                        <div className="card-body">
                            <p>Página no encontrada</p>
                            <Link to="/">Volver al inicio</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}