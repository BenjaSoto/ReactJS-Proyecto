import Nav from "./Nav";
import style from "./Header.module.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import { useAuth } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext";

const Header = () => {
    const { itemsEnCarrito } = useCarrito();
    const totalItems = itemsEnCarrito();
    const { user, logout } = useAuth();
    const { busqueda, setBusqueda } = useSearch();
    const navigate = useNavigate();
    const location = useLocation();

    const cerrarSesion = () => {
        logout();
        navigate("/");
    };

    const manejarCambio = (evento) => {
        setBusqueda(evento.target.value);

        if (location.pathname !== "/productos") {
            navigate("/productos");
        }
    };

    return (
        <header className={style.header}>
            <div className={style.logo}>
                <img src="/logo.png" alt="Logo de la marca" />
            </div>

            <Nav />

            <form className={style.buscador} onSubmit={(evento) => evento.preventDefault()} role="search">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={manejarCambio}
                    aria-label="Buscar productos"
                />
                {busqueda && (
                    <button type="button" onClick={() => setBusqueda("")} aria-label="Borrar búsqueda">
                        ✕
                    </button>
                )}
            </form>

            {user ? (
                <>
                    {user.rol === "admin" && (
                        <Link to="/panel" className={style.btn}>
                            <button>Panel</button>
                        </Link>
                    )}
                    <span className={style.saludo}>Hola, {user.nombre || user.email}</span>
                    <button className={style.btnSuelto} onClick={cerrarSesion}>Cerrar sesión</button>
                </>
            ) : (
                <Link to="/login" className={style.btn}>
                    <button>Login</button>
                </Link>
            )}

            <Link to="/carrito" className={style.btn}>
                <button>
                    Ver Carrito
                    {totalItems > 0 && <span className={style.contador}>{totalItems}</span>}
                </button>
            </Link>
        </header>
    )
}

export default Header;
