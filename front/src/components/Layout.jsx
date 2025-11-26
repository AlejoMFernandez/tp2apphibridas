import { Outlet, Link } from "react-router-dom"
import { useToken, useUsuario } from "../contexts/session.context"
import './Layout.css'

const Layout = () => {
    const token = useToken()
    const usuario = useUsuario()

    return (
        <div className="layout">
            <nav className="navbar">
                <div className="nav-brand">
                    <Link to="/">⚽ GOALDEMY</Link>
                </div>
                <div className="nav-links">
                    {token ? (
                        <>
                            <Link to="/">Teams</Link>
                            <Link to="/players">Players</Link>
                            <span className="nav-user">👤 {usuario?.email || 'Usuario'}</span>
                            <Link to="/logout" className="btn-logout">Salir</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Registrarse</Link>
                        </>
                    )}
                </div>
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
