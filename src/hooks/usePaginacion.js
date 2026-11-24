import { useEffect, useRef, useState } from "react";
import {
    collection,
    getCountFromServer,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore";

const usePaginacion = ({
    db,
    nombreColeccion,
    tamanoPagina = 6,
    campoOrden = "title",
    direccionOrden = "asc",
}) => {
    const [elementos, setElementos] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [totalElementos, setTotalElementos] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const ultimosDocs = useRef({});

    const [recarga, setRecarga] = useState(0);

    const recargar = () => {
        ultimosDocs.current = {};
        setRecarga((anterior) => anterior + 1);
    };

    useEffect(() => {
        let activo = true;

        const contar = async () => {
            try {
                const respuesta = await getCountFromServer(collection(db, nombreColeccion));
                if (!activo) return;

                const total = respuesta.data().count;
                const paginas = Math.max(1, Math.ceil(total / tamanoPagina));
                setTotalElementos(total);
                setTotalPaginas(paginas);
                setPaginaActual((actual) => Math.min(actual, paginas));
            } catch (err) {
                console.error("Error al contar los documentos:", err);
            }
        };

        contar();
        return () => {
            activo = false;
        };
    }, [db, nombreColeccion, tamanoPagina, recarga]);

    useEffect(() => {
        let activo = true;

        const traerPagina = async () => {
            setCargando(true);
            setError(null);
            try {
                const coleccionRef = collection(db, nombreColeccion);
                const orden = orderBy(campoOrden, direccionOrden);

                let documentoAnterior = null;
                if (paginaActual > 1) {
                    documentoAnterior = ultimosDocs.current[paginaActual - 1];

                    if (!documentoAnterior) {
                        const saltar = await getDocs(
                            query(coleccionRef, orden, limit((paginaActual - 1) * tamanoPagina))
                        );
                        documentoAnterior = saltar.docs[saltar.docs.length - 1];
                    }
                }

                const consulta = documentoAnterior
                    ? query(coleccionRef, orden, startAfter(documentoAnterior), limit(tamanoPagina))
                    : query(coleccionRef, orden, limit(tamanoPagina));

                const respuesta = await getDocs(consulta);
                if (!activo) return;

                setElementos(respuesta.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

                if (respuesta.docs.length > 0) {
                    ultimosDocs.current[paginaActual] = respuesta.docs[respuesta.docs.length - 1];
                }
            } catch (err) {
                console.error("Error al traer la página:", err);
                if (activo) setError("No se pudieron cargar los productos. Intentá de nuevo más tarde.");
            } finally {
                if (activo) setCargando(false);
            }
        };

        traerPagina();
        return () => {
            activo = false;
        };
    }, [db, nombreColeccion, paginaActual, tamanoPagina, campoOrden, direccionOrden, recarga]);

    const irAPagina = (numero) => {
        if (numero >= 1 && numero <= totalPaginas) {
            setPaginaActual(numero);
        }
    };
    const paginaSiguiente = () => irAPagina(paginaActual + 1);
    const paginaAnterior = () => irAPagina(paginaActual - 1);

    return {
        elementos,
        setElementos,
        paginaActual,
        totalPaginas,
        totalElementos,
        cargando,
        error,
        irAPagina,
        paginaSiguiente,
        paginaAnterior,
        recargar,
    };
};

export default usePaginacion;
