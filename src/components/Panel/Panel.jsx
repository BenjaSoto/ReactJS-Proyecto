import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import usePaginacion from "../../hooks/usePaginacion";
import Cargando from "../comunes/Cargando";
import MensajeError from "../comunes/MensajeError";
import Modal from "../comunes/Modal";
import Paginacion from "../comunes/Paginacion";
import FormProductoContainer from "./FormProductoContainer";
import style from "./Panel.module.css";

const Panel = () => {
    const {
        elementos: productos,
        setElementos: setProductos,
        paginaActual,
        totalPaginas,
        totalElementos,
        cargando,
        error: errorCarga,
        irAPagina,
        recargar,
    } = usePaginacion({
        db,
        nombreColeccion: "productos",
        tamanoPagina: 5,
        campoOrden: "title",
        direccionOrden: "asc",
    });

    const [formAbierto, setFormAbierto] = useState(false);
    const [productoAEditar, setProductoAEditar] = useState(null);

    const abrirAlta = () => {
        setProductoAEditar(null);
        setFormAbierto(true);
    };

    const abrirEdicion = (producto) => {
        setProductoAEditar(producto);
        setFormAbierto(true);
    };

    const cerrarForm = () => {
        setFormAbierto(false);
        setProductoAEditar(null);
    };

    const alGuardar = (productoGuardado, esEdicion) => {
        if (esEdicion) {
            setProductos((previos) =>
                previos.map((p) => (p.id === productoGuardado.id ? productoGuardado : p))
            );
        } else {
            recargar();
        }
        cerrarForm();
    };

    const eliminarProducto = async (id) => {
        if (!window.confirm("¿Está seguro de que desea eliminar este producto?")) return;

        try {
            await deleteDoc(doc(db, "productos", id));
            recargar();
        } catch (err) {
            console.error("Error al eliminar el producto:", err);
            alert("Hubo un error al intentar eliminar el producto.");
        }
    };

    if (cargando && productos.length === 0) return <Cargando mensaje="Cargando panel..." />;

    return (
        <div className={style.panel}>
            <h2>Panel de gestión</h2>

            {errorCarga && <MensajeError mensaje={errorCarga} />}

            <div className={style.barra}>
                <h3>Productos ({totalElementos})</h3>
                <button className={style.btnPrimario} onClick={abrirAlta}>
                    + Agregar producto
                </button>
            </div>

            {productos.length === 0 ? (
                <div className={style.vacio}>
                    <p>No hay productos cargados todavía.</p>
                </div>
            ) : (
                <div className={style.tablaContenedor}>
                    <table className={style.tabla}>
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((prod) => (
                                <tr key={prod.id}>
                                    <td><img src={prod.image} alt={prod.title} /></td>
                                    <td>{prod.title}</td>
                                    <td>{prod.category}</td>
                                    <td>${prod.price}</td>
                                    <td>{prod.stock}</td>
                                    <td>
                                        <button className={style.btnSecundario} onClick={() => abrirEdicion(prod)}>
                                            Editar
                                        </button>
                                        <button className={style.btnPeligro} onClick={() => eliminarProducto(prod.id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                alCambiarPagina={irAPagina}
                deshabilitado={cargando}
            />

            {formAbierto && (
                <Modal titulo={productoAEditar ? "Editar producto" : "Agregar producto"} cerrar={cerrarForm}>
                    <FormProductoContainer productoAEditar={productoAEditar} onGuardado={alGuardar} />
                </Modal>
            )}
        </div>
    );
};

export default Panel;
