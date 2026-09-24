import style from "./Personas.module.css"

const Personas = ({nombre, rol}) =>{
    return (
        <div className={style.card}>
            <h4>
                {nombre}
            </h4>
            <p>{rol}</p>
        </div>

    )
}

export default Personas;