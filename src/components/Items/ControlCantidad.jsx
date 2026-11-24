import style from "./ControlCantidad.module.css";

const ControlCantidad = ({ cantidad, alRestar, alSumar, sumarDeshabilitado = false, nombre }) => {
    return (
        <div className={style.control}>
            <button
                onClick={alRestar}
                disabled={cantidad === 0}
                aria-label={`Quitar una unidad de ${nombre}`}
            >
                -
            </button>
            <span>{cantidad}</span>
            <button
                onClick={alSumar}
                disabled={sumarDeshabilitado}
                aria-label={`Sumar una unidad de ${nombre}`}
            >
                +
            </button>
        </div>
    );
};

export default ControlCantidad;
