import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import usePaginacion from "../../hooks/usePaginacion";
import { useSearch } from "../../context/SearchContext";
import { ItemList } from "./ItemList";
import Paginacion from "../comunes/Paginacion";
import Cargando from "../comunes/Cargando";
import MensajeError from "../comunes/MensajeError";
import style from "./ItemListContainer.module.css";

export function ItemListContainer({ Mensaje }) {
    const { busqueda } = useSearch();
    const hayBusqueda = busqueda.trim() !== "";

    const {
        elementos: productos,
        paginaActual,
        totalPaginas,
        cargando,
        error,
        irAPagina,
    } = usePaginacion({
        db,
        nombreColeccion: "productos",
        tamanoPagina: 8,
        campoOrden: "title",
        direccionOrden: "asc",
    });

    const [todos, setTodos] = useState([]);
    const [cargandoTodos, setCargandoTodos] = useState(false);
    const [errorTodos, setErrorTodos] = useState(null);

    useEffect(() => {
        if (!hayBusqueda || todos.length > 0) return;
        let activo = true;

        const obtenerTodos = async () => {
            setCargandoTodos(true);
            setErrorTodos(null);
            try {
                const respuesta = await getDocs(collection(db, "productos"));
                if (activo) {
                    setTodos(respuesta.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                }
            } catch (err) {
                console.error(err);
                if (activo) setErrorTodos("No se pudo realizar la búsqueda. Intentá de nuevo más tarde.");
            } finally {
                if (activo) setCargandoTodos(false);
            }
        };

        obtenerTodos();
        return () => {
            activo = false;
        };
    }, [hayBusqueda, todos.length]);

    const cambiarPagina = (numero) => {
        irAPagina(numero);
        window.scrollTo(0, 0);
    };

    if (hayBusqueda) {
        if (cargandoTodos && todos.length === 0) return <Cargando mensaje="Buscando productos..." />;
        if (errorTodos) return <MensajeError mensaje={errorTodos} />;

        const resultados = todos.filter((prod) =>
            prod.title.toLowerCase().includes(busqueda.trim().toLowerCase())
        );

        return (
            <div className={style.productos}>
                <h2>{Mensaje}</h2>
                {resultados.length === 0 ? (
                    <p className={style.sinResultados}>No se encontraron productos para "{busqueda}".</p>
                ) : (
                    <ItemList productos={resultados} />
                )}
            </div>
        );
    }

    if (cargando && productos.length === 0) {
        return <Cargando mensaje="Cargando productos, por favor espere..." />;
    }
    if (error) return <MensajeError mensaje={error} />;

    return (
        <div className={style.productos}>
            <h2>{Mensaje}</h2>

            {productos.length === 0 ? (
                <p className={style.sinResultados}>No hay productos disponibles.</p>
            ) : (
                <ItemList productos={productos} />
            )}

            <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                alCambiarPagina={cambiarPagina}
                deshabilitado={cargando}
            />
        </div>
    );
}
