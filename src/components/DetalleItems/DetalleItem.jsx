import style from "./DetalleItem.module.css"
import { useCarrito } from "../../context/CarritoContext";

const DetalleItem = ({ id, title, price, image, description, category, stock }) => {
    const { agregarACarrito, getCantidad } = useCarrito();

    const producto = { id, title, price, image, stock };

    const enCarrito = getCantidad(id);
    const sinStock = stock <= 0;
    const llegoAlTope = enCarrito >= stock;

    const manejarAgregarACarrito = () => {
        agregarACarrito({ producto, cantidad: 1 });
    };

    return (
        <div className={style.detalle}>
            <div className={style.detalleImg}>
                <img src={image} alt={title} />
            </div>

            <div className={style.detalleContent}>
                <h3 title={title} >{title}</h3>
                <p title={category}>{category}</p>

                <p className={style.descripcion} title={description}>Descripcion:<br />{description}</p>
                <p>Stock disponible: {stock}</p>
                {enCarrito > 0 && <p>En tu carrito: {enCarrito}</p>}
                <div className={style.detallePrecio}>
                    <p>${price}</p>
                    <button
                        className={style.btnAgregar}
                        onClick={manejarAgregarACarrito}
                        disabled={sinStock || llegoAlTope}
                    >
                        {sinStock
                            ? "Sin stock"
                            : llegoAlTope
                            ? "Stock máximo en el carrito"
                            : "Agregar al carrito"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetalleItem;
