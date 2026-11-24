import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import style from "./Carrito.module.css";

const Carrito = () => {
    const {
        carrito,
        eliminarDelCarrito,
        incrementarCantidad,
        decrementarCantidad,
        vaciarCarrito,
        cobroTotal,
    } = useCarrito();

    if (carrito.length === 0) {
        return (
            <div className={style.carrito}>
                <h2>El carrito está vacío</h2>
                <p>Agregá productos para continuar con la compra.</p>
                <Link to="/productos" className={style.btn}>Ver productos</Link>
            </div>
        );
    }

    const finalizarCompra = () => {
        alert("¡Gracias por tu compra!");
        vaciarCarrito();
    };

    return (
        <div className={style.carrito}>
            <h2>Tu carrito</h2>

            <ul className={style.lista}>
                {carrito.map((item) => (
                    <li key={item.id} className={style.item}>
                        <img src={item.image} alt={item.title} />
                        <div className={style.info}>
                            <h4>{item.title}</h4>
                            <p>Precio unitario: ${item.price}</p>
                            <p>Subtotal: ${(item.price * item.cantidad).toFixed(2)}</p>
                        </div>
                        <div className={style.cantidad}>
                            <button onClick={() => decrementarCantidad(item.id)} aria-label="Quitar una unidad">-</button>
                            <span>{item.cantidad}</span>
                            <button
                                onClick={() => incrementarCantidad(item.id)}
                                disabled={item.cantidad >= item.stock}
                                aria-label="Agregar una unidad"
                            >
                                +
                            </button>
                        </div>
                        <button className={style.eliminar} onClick={() => eliminarDelCarrito(item.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>

            <h3>Total a pagar: ${cobroTotal().toFixed(2)}</h3>

            <div className={style.acciones}>
                <button className={style.btn} onClick={vaciarCarrito}>Vaciar carrito</button>
                <button className={style.btn} onClick={finalizarCompra}>Finalizar compra</button>
            </div>
        </div>
    );
};

export default Carrito;
