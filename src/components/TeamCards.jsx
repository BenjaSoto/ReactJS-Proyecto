import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import Personas from "./Personas"
import style from "./TeamCards.module.css"

const TeamCards = () =>{
    const [equipo, setEquipo] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerEquipo = async () => {
            try {
                const respuesta = await getDocs(collection(db, "equipo"));
                setEquipo(respuesta.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (err) {
                console.error("Error al cargar el equipo:", err);
                setError("No se pudo cargar el equipo.");
            } finally {
                setCargando(false);
            }
        };

        obtenerEquipo();
    }, []);

    if (!cargando && !error && equipo.length === 0) return null;

    return (
        <div className={style.teamContainer}>
            <h3 className={style.teamTitulo}>
                Nuestro Equipo
            </h3>

            {cargando && <p className={style.estado}>Cargando equipo...</p>}
            {error && <p className={style.estado}>{error}</p>}

            <div  className={style.cardsWrapper}>
                {
                    equipo.map((persona) =>(
                        <Personas
                            key={persona.id}
                            nombre={persona.nombre}
                            rol={persona.rol}
                            fotoURL={persona.fotoURL}
                            linkedinURL={persona.linkedinURL}/>
                    ) )
                }
            </div>
        </div>

    )

}

export default TeamCards;
