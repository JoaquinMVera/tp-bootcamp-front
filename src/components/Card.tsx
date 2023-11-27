import { RemainingTickets,Performance,Show } from "../interfaces/types";
import { Link } from 'react-router-dom';
import style from "../styles/Card.module.scss"
import { useAppSelector } from "../hooks";
import clock from "../assets/clock.svg"
import map from "../assets/map-pin.svg"
import theather from "../assets/theatre (1).svg"
import alert from "../assets/alert-triangle.svg"
import altertCircle from "../assets/alert-circle.svg"
import concert from "../assets/concert (3).svg"
import musical from "../assets/musical.svg"


interface Props {
//Que necesito? El nombre del show, la info de la performance,los remainings
    show:Show;
    performance: Performance;
    remainingTickes: RemainingTickets[];
    //son los remaining tickets de esta performance, nos traemos varios porque capaz tenemos varias zonas
    venue:string;
}

const month: String[] = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"]

const Card = ({show,performance,remainingTickes,venue}: Props) => {
    const user = useAppSelector((state) => state.user.user)

    //sumatoria de todoslos remaining que nos pasaron por parametro
    const restantes = remainingTickes.reduce((suma, tickets) => {
        return suma + tickets.remaining;
      }, 0);


      //La logica de que componente de warning va
      const warning =
        restantes > 14 ? (
          <div className={style.availableTickets}>
            <p>¡Entradas disponibles!</p>
          </div>
        ) : restantes > 0 ? (
          <div className={style.lastTickets}>
            <img src={altertCircle} alt="circulito" />
            <p>¡Ultimas {restantes} entradas!</p>
          </div>
        ) : (
          <div className={style.soldOut}>
            <img src={alert} alt="triangulito" />
            <p>¡Agotado!</p>
          </div>
        );




        
      //la logica para decidir que tipo e iconito iba. Podria haber sido un 
      //switch case
      const type = show.category === "theather" ? (
        <>
        <img src={theather} alt="mascarita" />

        </>        
      ) : show.category === "concert" ? (
        <>
        <img src={concert} alt="instrumentos" />
        </>
      ) : (
        <>
        <img src={musical} alt="tickets musical" />
        </>
      )

      const date = new Date(performance.date)

    return (
        <div className={style.cardContainer} key={performance.id}>
            <div className = {style.eventContainer}>
                <div className={style.event}>
                    <div className={style.eventTitle}>
                    <div className={style.titleDate}>
                           <p>{month[date.getMonth()]}</p>
                           <p>{date.getDate()}</p>
                    </div>
                    <p>{show.name}</p>
                    </div>

                    <div className={style.iconInfoContainer}>
                        <div className={style.dateAndPlaceContainer}>
                            <div className={style.hour}>
                                <img src={clock}  alt="reloj" />
                                <p>{"21:00 hs"}</p>
                            </div>
                            <div className={style.place}>
                                <img src={map} alt="mapita" />
                                <p>{venue}</p>
                            </div>

                        </div>

                        <div className = {style.typeContainer}>
                            <div className={style.typeIconContainer}>
                                {type}
                            </div>
                        <p>{show.category}</p>
                        </div>

                    </div>                    
                </div>

                <div className={style.description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta odio expedita dolorum sapiente quas, iure excepturi quos? Aut minus esse nulla illum, dolorem error fugit quisquam! Odio consequatur fugit eveniet.</div>
            </div>
            <div className ={style.callToActionContainer}>
                { warning}
                <Link className={style.link} to ={`/detalle/${performance.id}`}>
                <button className ={style.buyButton} disabled = {user === null}>
                    <p>COMPRAR</p>
                </button>
                </Link>
                
            </div>
        </div>
    )
}

export default Card