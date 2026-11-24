import style from "./Modal.module.css";

const Modal = ({ titulo, cerrar, children }) => {
    return (
        <div className={style.fondo} onClick={cerrar}>
            <div
                className={style.ventana}
                role="dialog"
                aria-modal="true"
                aria-label={titulo}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={style.encabezado}>
                    <h3>{titulo}</h3>
                    <button onClick={cerrar} aria-label="Cerrar">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
