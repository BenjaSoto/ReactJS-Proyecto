import style from "./MensajeError.module.css";

const MensajeError = ({ mensaje }) => {
    return (
        <div className={style.error} role="alert">
            <p>{mensaje}</p>
        </div>
    );
};

export default MensajeError;
