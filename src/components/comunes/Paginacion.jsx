import style from "./Paginacion.module.css";

const Paginacion = ({
    paginaActual = 1,
    totalPaginas = 1,
    alCambiarPagina,
    maximoVisibles = 5,
    deshabilitado = false,
}) => {
    if (totalPaginas <= 1) return null;

    const mitad = Math.floor(maximoVisibles / 2);
    let inicio = Math.max(1, paginaActual - mitad);
    const fin = Math.min(totalPaginas, inicio + maximoVisibles - 1);
    inicio = Math.max(1, fin - maximoVisibles + 1);

    const numeros = [];
    for (let i = inicio; i <= fin; i++) {
        numeros.push(i);
    }

    return (
        <nav className={style.paginacion} aria-label="Paginación">
            <button
                type="button"
                onClick={() => alCambiarPagina(paginaActual - 1)}
                disabled={deshabilitado || paginaActual <= 1}
                aria-label="Página anterior"
            >
                &lt;
            </button>

            {numeros.map((numero) => (
                <button
                    key={numero}
                    type="button"
                    className={numero === paginaActual ? style.activa : ""}
                    onClick={() => alCambiarPagina(numero)}
                    disabled={deshabilitado}
                    aria-current={numero === paginaActual ? "page" : undefined}
                >
                    {numero}
                </button>
            ))}

            <button
                type="button"
                onClick={() => alCambiarPagina(paginaActual + 1)}
                disabled={deshabilitado || paginaActual >= totalPaginas}
                aria-label="Página siguiente"
            >
                &gt;
            </button>
        </nav>
    );
};

export default Paginacion;
