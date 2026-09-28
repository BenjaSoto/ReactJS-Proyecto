import { ItemList } from "./ItemList";
import style from "./ItemListContainer.module.css"
import React, { useState, useEffect } from 'react';



export function ItemListContainer({ Mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        fetch('/data/productos.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los productos');}
                return respuesta.json();
            })
            .then((datos) => {
                const productosConStock = datos.filter((item) => item.stock > 0);
                setProductos(productosConStock);
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

            <div className={style.productos}>
                <h2>{Mensaje}</h2>
                <ItemList productos={productos} />
            </div>
        </div>
    );
}