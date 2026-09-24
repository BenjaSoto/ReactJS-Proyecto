import Personas from "./Personas"
import style from "./TeamCards.module.css"


const TeamCards = () =>{
    const equipo = [
    { id: 1, nombre: "Ana Paula", rol: "Talento & RRHH" },
    { id: 2, nombre: "Elvis Soto", rol: "Backend Java" },
    { id: 3, nombre: "Camila Velazquez", rol: "QA Automation" }
    ]
    
    return (
        <div className={style.teamContainer}>
            <h3 className={style.teamTitulo}>
                Nuestro Equipo
            </h3>
            <div  className={style.cardsWrapper}>
                {
                    equipo.map((persona) =>(
                        <Personas 
                            key={persona.id}
                            nombre={persona.nombre}
                            rol={persona.rol}/>
                    ) )
                }
            </div>
        </div>

    )

}

export default TeamCards;