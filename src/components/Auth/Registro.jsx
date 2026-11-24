import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import style from "./Auth.module.css";

const Registro = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const navigate = useNavigate();
    const { signup, recargarUsuario } = useAuth();

    const manejarRegistro = async (evento) => {
        evento.preventDefault();
        setError(null);

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setEnviando(true);
        try {
            const credencial = await signup(email, password);

            await setDoc(doc(db, "usuarios", credencial.user.uid), {
                nombre,
                apellido,
                email,
                rol: "user",
            });

            await recargarUsuario();

            navigate("/");
        } catch (err) {
            console.error("Error en el registro:", err.code, err.message);

            if (err.code === "auth/email-already-in-use") {
                const quiereLoguearse = window.confirm(
                    "Este correo ya está registrado. ¿Querés iniciar sesión?"
                );
                if (quiereLoguearse) {
                    navigate("/login");
                } else {
                    navigate("/");
                }
            } else {
                setError("No se pudo crear la cuenta. Revisá los datos e intentá de nuevo.");
            }
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className={style.contenedor}>
            <form className={style.formulario} onSubmit={manejarRegistro}>
                <h2>Crear cuenta</h2>

                <label htmlFor="nombre">Nombre</label>
                <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

                <label htmlFor="apellido">Apellido</label>
                <input id="apellido" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />

                <label htmlFor="email">Correo electrónico</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                />

                {error && <p className={style.error} role="alert">{error}</p>}

                <button type="submit" disabled={enviando}>
                    {enviando ? "Creando cuenta..." : "Registrarse"}
                </button>

                <p className={style.enlace}>
                    ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
                </p>
            </form>
        </div>
    );
};

export default Registro;
