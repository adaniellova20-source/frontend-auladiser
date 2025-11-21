import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">MiSitio</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end>
                                Inicio
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customers">
                                Clientes
                            </NavLink>
                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    );
}
