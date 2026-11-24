import style from "./Cargando.module.css";

const Cargando = ({ mensaje = "Cargando..." }) => {
    return (
        <div className={style.contenedor} role="status">
            <p>{mensaje}</p>
        </div>
    );
};

export default Cargando;
