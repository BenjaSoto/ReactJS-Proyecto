import { useState } from "react";
import style from "./Contacto.module.css";

const URL_FORMULARIO = "https://formspree.io/f/mlgzgaqv";

const infoContacto = [
    {
        id: 1,
        icono: "/contactos/mail.png",
        alt: "logo mail",
        tipo: "Email",
        valor: "testing@gmail.com",
        detalle: "Respondemos en menos de 24hs",
    },
    {
        id: 2,
        icono: "/contactos/mobile.png",
        alt: "logo telefono",
        tipo: "Telefono/WhatsApp",
        valor: "+54 9 11 6573-3180",
        detalle: "Lun - Vie de 9 a 18hs",
    },
    {
        id: 3,
        icono: "/contactos/clock.png",
        alt: "logo reloj",
        tipo: "Horario de atención",
        valor: "Lun a Vie, 9:00 - 18:00",
        detalle: "Sabados 10:00 - 14:00",
    },
    {
        id: 4,
        icono: "/contactos/location.png",
        alt: "logo ubicacion",
        tipo: "Dirección",
        valor: "Av. Corrientes 1066, CABA",
        detalle: "Buenos Aires, Argentina",
    },
];

const estadoInicial = { nombre: "", email: "", asunto: "", mensaje: "" };

const Contacto = () => {
    const [datos, setDatos] = useState(estadoInicial);
    const [estado, setEstado] = useState("inactivo");

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatos((previo) => ({ ...previo, [name]: value }));
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        setEstado("enviando");

        try {
            const respuesta = await fetch(URL_FORMULARIO, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(datos),
            });

            if (!respuesta.ok) throw new Error("No se pudo enviar el mensaje");

            setDatos(estadoInicial);
            setEstado("enviado");
        } catch (error) {
            console.error(error);
            setEstado("error");
        }
    };

    return (
        <section className={style.contactos}>
            <div className={style.titulo}>
                <h2>CONTACTO</h2>
                <h3>¿Tenés alguna consulta?</h3>
                <p>Escribinos y te respondemos a la brevedad</p>
            </div>

            <div className={style.contenedorInfo}>
                <div className={style.izquierda}>
                    {infoContacto.map((item) => (
                        <div key={item.id} className={style.info}>
                            <div className={style.logoInfo}>
                                <img src={item.icono} alt={item.alt} />
                            </div>
                            <div className={style.detalleInfo}>
                                <p className={style.tipoContacto}>{item.tipo}</p>
                                <p className={style.valorContacto}>{item.valor}</p>
                                <p className={style.tipoContacto}>{item.detalle}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={style.derecha}>
                    <form onSubmit={manejarEnvio}>
                        <section className={style.fila}>
                            <div className={style.grupo}>
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    placeholder="Ingrese su nombre"
                                    value={datos.nombre}
                                    onChange={manejarCambio}
                                    required
                                />
                            </div>
                            <div className={style.grupo}>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="tu-mail@gmail.com"
                                    value={datos.email}
                                    onChange={manejarCambio}
                                    required
                                />
                            </div>
                        </section>

                        <label htmlFor="asunto">Asunto</label>
                        <input
                            id="asunto"
                            name="asunto"
                            type="text"
                            placeholder="¿En qué te podemos ayudar?"
                            value={datos.asunto}
                            onChange={manejarCambio}
                            required
                        />

                        <label htmlFor="mensaje">Mensaje</label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            placeholder="Escribí tu mensaje aca..."
                            value={datos.mensaje}
                            onChange={manejarCambio}
                            required
                        />

                        <button type="submit" className={style.boton} disabled={estado === "enviando"}>
                            {estado === "enviando" ? "Enviando..." : "Enviar mensaje"}
                        </button>

                        {estado === "enviado" && (
                            <p className={style.exito} role="status">¡Mensaje enviado! Te respondemos a la brevedad.</p>
                        )}
                        {estado === "error" && (
                            <p className={style.error} role="alert">No se pudo enviar el mensaje. Intentá de nuevo.</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contacto;
