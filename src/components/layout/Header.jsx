import Nav from "./Nav";
import style from "./Header.module.css"
const Header = () =>{

    return(
        <header className={style.header}>
        <div className={style.logo}>
            <img src="public\logo.png" alt="Logo de la marca"/>
        </div>
        
        <Nav/>
        
        <a href="#" className={style.btn}><button>Login</button></a>

        <a href="carrito.html" className={style.btn}>
        <button>Ver Carrito</button>
        </a>
        </header>
    )
}

export default Header;