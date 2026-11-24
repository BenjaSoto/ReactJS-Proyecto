import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import DetalleItem from "./DetalleItem";
import Cargando from "../comunes/Cargando";
import MensajeError from "../comunes/MensajeError";

export function DetalleItemContainer() {
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    const { idProducto } = useParams();

    useEffect(() => {
        const obtenerProducto = async () => {
            setCargando(true);
            setError(null);
            try {
                const respuesta = await getDoc(doc(db, "productos", idProducto));

                if (respuesta.exists()) {
                    setProducto({ ...respuesta.data(), id: respuesta.id });
                } else {
                    setError("El producto no existe.");
                }
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar el producto. Intentá de nuevo más tarde.");
            } finally {
                setCargando(false);
            }
        };

        obtenerProducto();
    }, [idProducto]);

    if (cargando) return <Cargando mensaje="Cargando producto..." />;
    if (error) return <MensajeError mensaje={error} />;

    return <DetalleItem {...producto} />;
}
