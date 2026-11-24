import style from "./Personas.module.css"

const Personas = ({nombre, rol, fotoURL, linkedinURL}) =>{
    const contenido = (
        <>
            {fotoURL && <img src={fotoURL} alt={`Foto de ${nombre}`} className={style.foto} />}
            <h4>
                {nombre}
            </h4>
            <p>{rol}</p>
        </>
    )

    if (linkedinURL) {
        return (
            <a
                href={linkedinURL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${style.card} ${style.enlace}`}
                aria-label={`Ver el LinkedIn de ${nombre}`}>
                {contenido}
            </a>
        )
    }

    return <div className={style.card}>{contenido}</div>
}

export default Personas;
