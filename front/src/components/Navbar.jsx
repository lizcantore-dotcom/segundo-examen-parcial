import { Activity, useContext } from 'react'
import { Link } from "react-router"
import { contexto, useRol } from '../context/Session.Context.jsx'

export default function Navbar() {
    const auth = useContext(contexto)
    const rol = useRol()

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold text-primary" to="/">
                    🐾 Huellas & Refugios
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav me-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/contact">Contacto</Link>
                        <Activity mode={auth?.usuario ? "visible" : "hidden"}>
                            <Link className="nav-link" to="/mascotas">Mascotas</Link>
                            <Link className="nav-link" to="/refugios">Refugios</Link>
                            {rol() == "superadmin" && (
                                <Link className="nav-link" to="/usuarios">Usuarios</Link>
                            )}
                        </Activity>
                    </div>
                    <div className="navbar-nav d-flex gap-2 align-items-center">
                        <Activity mode={auth?.usuario ? "visible" : "hidden"}>
                            <span className="nav-link text-muted small">
                                {auth?.usuario?.email}
                            </span>
                            <Link className="nav-link" to="/salir">Logout</Link>
                        </Activity>
                        <Activity mode={!auth?.usuario ? "visible" : "hidden"}>
                            <Link className="nav-link" to="/login">Login</Link>
                            <Link className="nav-link" to="/register">Registro</Link>
                        </Activity>
                    </div>
                </div>
            </div>
        </nav>
    )
}