import style from "./Item.module.css"

export function Item({nombre, precio, stock}) {
    return (
        <div className={style.card}>
                    <div className={style.cardImg}>
                        <img src="/public/contactos/instagram.svg" alt="Descripción"/>
                    </div>

                    <div className={style.cardContent}>
                        <h3>{nombre}</h3>
                        <p>CATEGGORIA</p>
                        <p>{stock}</p>
                        <div className={style.cardPrecio}>
                            <p>{precio}$</p>
                            <div className={style.cardBtns}>
                                <a href="#" className={style.btnCard}><button>-</button></a>
                                <a href="#" className={style.btnCard}><button>+</button></a>
                            </div> 
                        </div>
                    </div>
        </div>
    )
}