import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from "../styles/EventDetail.module.scss"
import { useAppSelector,useAppDispatch } from '../hooks';
import { format, parseISO } from 'date-fns';
import { Show,Venue,Zone,ShowInfo,RemainingTickets } from '../interfaces/types';
import TicketQuantity from './TicketQuantity';
import estadio from "../assets/estadio.png"
import logoAllaria from "../assets/Allaria Logo Fullcolor.png"
import dollar from "../assets/dollar-sign.svg"
import ModalWrapper from './ModalWrapper';
import DepositModal from './Modals/DepositModal';
import ConfirmationModal from './Modals/ConfirmationModal';
import successIcon from "../assets/sucessValidation.svg"

const EventDetail = () => {
  const { performanceId } = useParams();
  const shows = useAppSelector((state) => state.shows.shows)
  const venues = useAppSelector((state) => state.shows.venues)
  const user = useAppSelector((state) => state.user.user)


  const numericId = performanceId ? parseInt(performanceId) : 1
  //esto me lo pide js,, pero se que siempre que tomemos el camino bueno, esto va a pasar

  const [date,setDate] = useState<string>("")
  const [show,setShow] = useState<Show | undefined>(undefined)
  const [venue,setVenue] = useState<Venue | undefined>(undefined)
  const [zones,setZones] = useState<Zone[]>([])
  const [ticketAmount,setTicketAmount] = useState<number>(0)
  const [selectedZone,setSelectedZone] = useState<string>("")
  const [selectedPrice,setSelectedPrice] = useState<number>(0)
  const [totalPrice,setTotalPrice] = useState<number>(0)
  const [tax,setTax] = useState<number>(200)
  const [balanceError,setBalanceError] = useState<boolean>(false)
  const [depositModal,setDepositModal] = useState<boolean>(false)
  const [confirmationModal,setConfirmationModal] = useState<boolean>(false)
  const [depositSuccess,setDepositSuccess] = useState<boolean>(false)
  const [pucharseFinished,setPucharseFinished] = useState<boolean>(false)
  const [remainingTickets,setRemainingTickets] = useState<RemainingTickets[]>([])
  const [lessTicketsError,setLessTicketsError] = useState<boolean>(false)

  const getData = () => {
    const showInfo = shows.filter((showInfo) => showInfo.performances.some((performance) => performance.id === numericId))[0]
    //Aca tengo la showinfo que tiene este 


    const {show,performances,zones,remainingTickets} = showInfo;

    setShow(show)


    //formatear el string para ponerle la fecha!
    const dateString = performances.filter((perfomance) => perfomance.id === numericId).map((performance) => performance.date)[0]
    const date = parseISO(dateString)
    const formato = "EEEE, d 'de' MMMM"

    setDate(format(date,formato))

    const venue = venues.filter((venue) => venue.id === show.venueId)[0]
    setVenue(venue)
    //buscamo la venue, porque necesitamos el nombre

    setZones(zones)
    setSelectedPrice(zones.filter((zone) => zone.name === zones[0].name)[0].price)
    //ponemos el precio inicial, de la zona 0, para que se habra como default


    const filtredRemainingTickets = remainingTickets.filter((remaining) => {
         return remaining.performanceId === numericId
    })
    //filtramos los remainings tal que sean de esta fecha

    setRemainingTickets(filtredRemainingTickets)
    setSelectedZone(zones[0].name)


  }
 
  const updateTicketAmount = (newQuantity:number) => {
    //Esto es para manejar el sincronismo del amount
    setTicketAmount(newQuantity)
    setTotalPrice(newQuantity * selectedPrice + newQuantity * tax)
    setBalanceError((newQuantity * selectedPrice + newQuantity * tax) > user?.balance);

    //creo que esto de abajo ya no es necesario por la logica del ticket Quantity
    if(show !== undefined){
        setLessTicketsError(remainingOfZone() < newQuantity)
    }
  }



    useEffect(() => {
        //Si ya se cargaron los datos, cargamos toda la data
		if(shows.length > 0 && venues.length > 0){
			getData()
		}
	
	},[shows,venues,user])



    //igual que en home, esto es para controlar la logicade los depositos
    const toggleDeposit = () => {
        setDepositModal(!depositModal)
    }

    const afterDeposit=(success:boolean) => {
        toggleDeposit()
        setDepositSuccess(success)
        toggleConfirmationModal()
    }

    const toggleConfirmationModal = () => {
        setConfirmationModal(!confirmationModal)
    }



    //Buscamos la cantidad remaining de esa zona!
    const remainingOfZone = () =>{
        const zoneIdSelected = zones.filter((zone) => zone.name === selectedZone)[0].id

        const remainingOfSelected = remainingTickets.filter((remaining) => remaining.zoneId === zoneIdSelected)[0]


        return remainingOfSelected.remaining

    }


    //esta es la funcion de cuando le das a comprar!
    const pushBooking = async () => {


        const bookingData = {
            userId: user?.id,
            zoneId: zones.filter((zone) => zone.name === selectedZone)[0].id,
            performanceId: numericId,
            ticketAmount: ticketAmount
        }


        console.log("Booking:",bookingData)

        const bookingResponse = await fetch(`http://localhost:9000/bookings`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            })

        
            const booking = await bookingResponse.json()

            console.log("booking de la db:", booking)
        
            setPucharseFinished(!pucharseFinished)
    }
    

  return (
    <>
        
        <div className={style.headerContainer}>
            <div className = {style.title}>
                <p>{date}</p>
                <p>{show?.name}</p>
            </div>
            <div className = {style.description}>
                <p>Ubicacion y Horario</p>
                <p>Estadio <span className={style.importantInfo}>{venue?.name}</span> , Av callle falsa 123 - <span className={style.importantInfo}>21hs</span></p>
            </div>

        </div>

        <div className = {style.separator}>
            <p>Precios/Ubicaciones/Disponibilidad</p>
        </div>
{ (!pucharseFinished && show !== undefined && user !== null) && (
        <>
        <div className= {style.shopContainer}>
            <div className={style.infoBuy}>
                <div className={style.zoneSelectorContainer}>
                    <p>Selecciona tu ubicacion</p>
                    <div className={style.zoneSelector}>
                    <label>
                        Ubicacion
                        
                        <select name = "zona del show" 
                        className={style.zoneSelect}
                        id = "" defaultValue="" onChange={(e) => {
                            setSelectedZone(e.target.value)
                            setSelectedPrice(zones.filter((zone) => zone.name === e.target.value)[0].price)
                        }}>
						    {
                                zones.map((zone) => {
                                    return <option key={zone.id}>{zone.name}</option>
                                })
                            }
                        </select>
                        
                        </label>
                    </div>
                </div>


                <div className={style.ticketSelectorContainer}>


                    
                         
                        <div className={style.ticketSelector}>
                        <div className={style.ticketContent}>
                            <div className={style.ticketInternalFrame}>


                                <div className={style.textTicket}>
                                    { show !== undefined && (
                                        <>
                                         <p> Entrada para zona {selectedZone}</p>
                                         
                                         <p>
                                         {`Quedan ${remainingOfZone()} entradas!`}
                                         </p>
                                        
                                        
                                        </>
                                        )

                                    }
                                    
                                    
                                    <div className={style.line}></div>
                                    <div className={style.ticketPrice}>
                                        <p>{selectedPrice}</p>
                                        <p>+200 costo de servicio</p>
                                    </div>
                                    <div className={style.line}></div>
                                </div>

                                <TicketQuantity inputUpdate={updateTicketAmount}
                                ticketPool = {remainingOfZone()}  />

                             
                            </div>
                        </div>

                        <div className={style.totalPrice}>
                            <p>{`Total: $${totalPrice}`}</p>
                            <p>El precio incluye impuestos</p>

                        </div>
                    </div>
                    
                    

                </div>




                
            </div>

            <div className={style.infoUserContainer}>
                
                <img src = {estadio} alt ="fotito de estadio"/>
                <div className={style.titleInfoUser}>
                    <p>Paga mas facil con Allaria+</p>

                    {
                        user !== null && (
                            <>
                    <div className={style.infoUser}>
                        <div className={style.balanceContainer}>
                            <img src={logoAllaria} alt="logito allaria" />
                            <div className={style.balance}>
                                <div className={style.balanceAvailable}>
                                    <p>Saldo <span>Disponible en tu cuenta</span></p>
                                </div>
                                <p>{ Math.floor(user.balance)},<span> {(user.balance - Math.floor(user.balance)).toFixed(2)}</span></p>
                            </div>


                            
                            
                        </div>
                        <div className={style.despositContainer} onClick={() => toggleDeposit()} >
                            <img src={dollar} alt="signo pesito" />
                            <p>Ingresar Dinero</p>
                        </div>

                        
                    </div>
                    
                            </>
                    

                    
                        )
                    }
                    
                </div>
                    <p className={style.balanceError} hidden={!balanceError}>
                    Tus fondos son insuficientes, ingresá dinero a tu cuenta para comprar.
                    
                    </p>
            </div>
            
            
        </div>
        <div className={style.buttonContainer}>
        <button className={style.buyButton} disabled={ lessTicketsError || balanceError || (ticketAmount == 0)} 
        onClick={() => pushBooking() }
        >
                <p>Comprar</p>
            </button>
        </div>
        
        
        </>
    )}

    {
        pucharseFinished && (
            <>
                <div className={style.finishedContainer}>
                    <div className={style.finishedBox}>
                        <img src={successIcon} alt="iconito verde" />
                        <div className={style.finishedTextBox}>
                            <p>
                            ¡Tu compra fue exitosa!
                            </p>

                            <p>
                            Recibirás un mail con los detalles de tu entrada
                            </p>
                        </div>
                    </div>
                </div>
        


            </>
        )
    }





        {
				depositModal && (
					<ModalWrapper>
						<DepositModal toggleAfterModal={afterDeposit}>
							
						</DepositModal>
					</ModalWrapper>
				)
			}

            {
                confirmationModal && (
                    <ModalWrapper>
                        <ConfirmationModal success={depositSuccess} toggleConfirmation={toggleConfirmationModal}>

                        </ConfirmationModal>
                    </ModalWrapper>
                )
            }
        
    </>
  );
};

export default EventDetail;