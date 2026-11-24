import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import style from "./Auth.module.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const manejarLogin = async (evento) => {
        evento.preventDefault();

        try {
            await login(email, password);
            alert("¡Inicio de sesión exitoso!");
            navigate("/");
        } catch (error) {
            console.error("Error en el login:", error.code, error.message);
            alert("Error: correo o contraseña incorrectos.");
        }
    };

    return (
        <div className={style.contenedor}>
            <form className={style.formulario} onSubmit={manejarLogin}>
                <h2>Iniciar sesión</h2>

                <label htmlFor="email">Correo electrónico</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
                <label htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>

                <button type="submit">Ingresar</button>

                <p className={style.enlace}>
                    ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
