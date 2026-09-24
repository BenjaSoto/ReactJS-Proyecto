import TeamCards from "../TeamCards";
import style from "./Footer.module.css"

const Footer = () => {
    return (

    <footer>
        <TeamCards/>
        <div className={style.footer}>
            <div className={`${style.footContainer} ${style.empresa}`}>
                <h2>Empresa</h2>
                <p>Productos de diseño simple y calidad duradera. Envios a todo el país.</p>
                <div className={style.footContainerLogos}>
                    <div className={style.logoFooter}>
                        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                        <img src="/public/contactos/whatsapp.svg" alt="logo whatsapp"/></a>
                    </div>
                    <div className={style.logoFooter}>
                        <a href="http://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="/public/contactos/instagram.svg" alt="logo instagram" />
                        
                        </a>
                    </div>
                </div>
            </div>
            <div className={`${style.footContainer} ${style.nosotros}`}>
                <h2>Tienda</h2>
                <ul>
                    <li><a href="">Todos los productos</a></li>
                    <li><a href="">Novedades</a></li>
                    <li><a href="">Ofertas</a></li>
                    <li><a href="">Mas vendidos</a></li>
                </ul>
            </div>
            <div className={`${style.footContainer} ${style.help}`}>
                <h2>Ayuda</h2>
                <ul>
                    <li><a href="">Preguntas frecuentes</a></li>
                    <li><a href="">Envíos y entregas</a></li>
                    <li><a href="">Cambios y devoluciones</a></li>
                    <li><a href="">Garantía</a></li>
                </ul>
            </div>
            <div className={`${style.footContainer} ${style.legal}`}>
                <h2>Legal</h2>
                <ul>
                    <li><a href="">Términos y condiciones</a></li>
                    <li><a href="">Politica de privacidad</a></li>
                    <li><a href="">Coockies</a></li>
                </ul>

            </div>
        </div>

        <hr></hr>
        <p className={style.derechosReservados}>© 2026 Empresa. Todos los derechos reservados.</p>
    </footer>

  )
}

export default Footer;