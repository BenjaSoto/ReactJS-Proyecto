import Nav from "./Nav";
import style from "./Header.module.css"
import { Link } from "react-router-dom";
const Header = () => {

    return (
        <header className={style.header}>
            <div className={style.logo}>
                <img src="/logo.png" alt="Logo de la marca" />
            </div>

            <Nav />

            <a href="#" className={style.btn}><button>Login</button></a>

            <Link to="/carrito" className={style.btn}>
                <button>Ver Carrito</button>
            </Link>
        </header>
    )
}

export default Header;