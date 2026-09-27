import style from "./Item.module.css"
import { Link } from "react-router-dom";
export function Item({ id, title, price, image, description, category }) {
    return (

        <div className={style.card}>
            <Link to={`/producto/${id}`} >
                <div className={style.cardImg}>
                    <img src={image} alt={description} />
                </div>
            </Link>
            <div className={style.cardContent}>
                <Link to={`/producto/${id}`} className={style.enlace}>
                    <h3 title={title} >{title}</h3>
                </Link>
                <p title={category}>{category}</p>
                <div className={style.cardPrecio}>
                    <p>${price}</p>
                    <div className={style.cardBtns}>
                        <a href="#" className={style.btnCard}><button>-</button></a>
                        <a href="#" className={style.btnCard}><button>+</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}