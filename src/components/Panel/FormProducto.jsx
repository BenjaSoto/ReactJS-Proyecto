import style from "./Panel.module.css";

const FormProducto = ({
    datosForm,
    errores,
    manejarCambio,
    manejarCambioImagen,
    manejarEnvio,
    esEdicion,
    cargando,
}) => {
    return (
        <form className={style.formulario} onSubmit={manejarEnvio} noValidate>
            <label htmlFor="title">Nombre</label>
            <input id="title" name="title" type="text" value={datosForm.title} onChange={manejarCambio} />
            {errores.title && <p className={style.errorCampo}>{errores.title}</p>}

            <label htmlFor="price">Precio</label>
            <input id="price" name="price" type="number" step="0.01" value={datosForm.price} onChange={manejarCambio} />
            {errores.price && <p className={style.errorCampo}>{errores.price}</p>}

            <label htmlFor="stock">Stock</label>
            <input id="stock" name="stock" type="number" value={datosForm.stock} onChange={manejarCambio} />
            {errores.stock && <p className={style.errorCampo}>{errores.stock}</p>}

            <label htmlFor="category">Categoría</label>
            <select id="category" name="category" value={datosForm.category} onChange={manejarCambio}>
                <option value="" disabled>Seleccioná una categoría</option>
                <option value="men's clothing">Ropa de hombre</option>
                <option value="women's clothing">Ropa de mujer</option>
                <option value="jewelery">Joyería</option>
                <option value="electronics">Electrónica</option>
            </select>
            {errores.category && <p className={style.errorCampo}>{errores.category}</p>}

            <label htmlFor="description">Descripción</label>
            <textarea id="description" name="description" rows="3" value={datosForm.description} onChange={manejarCambio} />
            {errores.description && <p className={style.errorCampo}>{errores.description}</p>}

            <label htmlFor="imagen">Imagen</label>
            <input id="imagen" type="file" accept="image/*" onChange={manejarCambioImagen} />
            {esEdicion && datosForm.image && (
                <div className={style.imagenActual}>
                    <p>Imagen actual (si no elegís otra, se mantiene):</p>
                    <img src={datosForm.image} alt="Imagen actual del producto" />
                </div>
            )}
            {errores.image && <p className={style.errorCampo}>{errores.image}</p>}

            {errores.general && <p className={style.errorCampo}>{errores.general}</p>}

            <button type="submit" className={style.btnPrimario} disabled={cargando}>
                {cargando ? "Guardando..." : esEdicion ? "Actualizar producto" : "Guardar producto"}
            </button>
        </form>
    );
};

export default FormProducto;
