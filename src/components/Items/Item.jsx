import { useState } from "react";
import style from "./Item.module.css"
import { Link } from "react-router-dom";
import ControlCantidad from "./ControlCantidad";

export function Item({ id, title, price, image, description, category, stock }) {
    const [contador, setContador] = useState(0);

    const incrementar = () => {
        if (contador < stock) setContador(contador + 1);
    };
    const decrementar = () => {
        if (contador > 0) setContador(contador - 1);
    };

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
                    {stock <= 0 && <span className={style.sinStock}>Sin stock</span>}
                    <ControlCantidad
                        cantidad={contador}
                        alRestar={decrementar}
                        alSumar={incrementar}
                        sumarDeshabilitado={contador >= stock}
                        nombre={title}
                    />
                </div>
            </div>
        </div>
    )
}
