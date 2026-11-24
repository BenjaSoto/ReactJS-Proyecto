export const subirImagen = async (archivo) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    if (!apiKey) {
        throw new Error("Falta la API key de ImgBB. Completá VITE_IMGBB_API_KEY en el archivo .env.");
    }

    const formData = new FormData();
    formData.append("image", archivo);

    const respuesta = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
    });

    const datos = await respuesta.json();

    if (!datos.success) {
        throw new Error("No se pudo subir la imagen a ImgBB.");
    }

    return datos.data.url;
};
