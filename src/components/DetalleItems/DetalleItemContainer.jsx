
import { useState, useEffect } from "react";
import DetalleItem from "./DetalleItem";

export function DetalleItemContainer({idProducto}) {
    const [producto, setProducto] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        fetch('/data/productos.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los productos');}
                return respuesta.json() ;
            })
            .then((datos) => {
                const itemEncontrado = datos.find((item) => item.id === idProducto);
                if (itemEncontrado) {
                    setProducto(itemEncontrado);
                } else {
                    setError("El producto no existe");
                }
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p>Cargando productos, por favor espere...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div>

            <div>
                <DetalleItem {...producto} />
            </div>
        </div>
    );
}