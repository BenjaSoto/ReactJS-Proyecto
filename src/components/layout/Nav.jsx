import style from "./Nav.module.css"

const Nav = () => {
    return (
        <nav>
            <ul className={style.navLinks}>
                <li><a href="#">Inicio</a></li>
                <li><a href="#productos">Productos</a></li>
                <li><a href="#contactos">Contactos</a></li>
            </ul>
        </nav>
    )


}

export default Nav;
