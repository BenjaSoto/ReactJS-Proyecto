import style from "./Nav.module.css"
import { Link } from "react-router-dom";
const Nav = () => {
    return (
        <nav>
            <ul className={style.navLinks}>
                
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/">Contactos</Link></li>
            </ul>
        </nav>
    )


}

export default Nav;
