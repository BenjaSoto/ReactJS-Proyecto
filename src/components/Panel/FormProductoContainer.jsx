import { useEffect, useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { subirImagen } from "../../services/imgbb";
import FormProducto from "./FormProducto";

const estadoInicial = {
    title: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
};

const FormProductoContainer = ({ productoAEditar, onGuardado }) => {
    const [datosForm, setDatosForm] = useState(estadoInicial);
    const [archivoImagen, setArchivoImagen] = useState(null);
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (productoAEditar) {
            setDatosForm({ ...estadoInicial, ...productoAEditar });
        } else {
            setDatosForm(estadoInicial);
        }
        setArchivoImagen(null);
        setErrores({});
    }, [productoAEditar]);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm((previo) => ({ ...previo, [name]: value }));
        setErrores((previo) => ({ ...previo, [name]: null }));
    };

    const manejarCambioImagen = (evento) => {
        setArchivoImagen(evento.target.files[0] || null);
        setErrores((previo) => ({ ...previo, image: null }));
    };

    const validar = () => {
        const nuevosErrores = {};

        if (!datosForm.title.trim()) {
            nuevosErrores.title = "El nombre es obligatorio.";
        }

        if (datosForm.price === "" || Number(datosForm.price) <= 0) {
            nuevosErrores.price = "El precio debe ser mayor que cero.";
        }

        if (datosForm.stock === "" || Number(datosForm.stock) < 0 || !Number.isInteger(Number(datosForm.stock))) {
            nuevosErrores.stock = "El stock debe ser un número entero mayor o igual a cero.";
        }

        if (!datosForm.category.trim()) {
            nuevosErrores.category = "La categoría es obligatoria.";
        }

        if (!datosForm.description.trim()) {
            nuevosErrores.description = "La descripción es obligatoria.";
        }

        if (!productoAEditar && !archivoImagen) {
            nuevosErrores.image = "Elegí una imagen para el producto.";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        if (!validar()) return;

        setCargando(true);
        try {
            let urlImagen = datosForm.image;
            if (archivoImagen) {
                urlImagen = await subirImagen(archivoImagen);
            }

            const producto = {
                title: datosForm.title.trim(),
                price: Number(datosForm.price),
                stock: Number(datosForm.stock),
                category: datosForm.category.trim().toLowerCase(),
                description: datosForm.description.trim(),
                image: urlImagen,
            };

            if (productoAEditar) {
                await updateDoc(doc(db, "productos", productoAEditar.id), producto);
                onGuardado({ ...productoAEditar, ...producto }, true);
            } else {
                const docRef = await addDoc(collection(db, "productos"), producto);
                onGuardado({ ...producto, id: docRef.id }, false);
            }
        } catch (err) {
            console.error("Error al guardar el producto:", err);
            setErrores({ general: err.message || "No se pudo guardar el producto. Intentá de nuevo." });
        } finally {
            setCargando(false);
        }
    };

    return (
        <FormProducto
            datosForm={datosForm}
            errores={errores}
            manejarCambio={manejarCambio}
            manejarCambioImagen={manejarCambioImagen}
            manejarEnvio={manejarEnvio}
            esEdicion={Boolean(productoAEditar)}
            cargando={cargando}
        />
    );
};

export default FormProductoContainer;
