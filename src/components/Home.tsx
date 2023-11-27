import { useEffect, useState } from "react";
import style from "../styles/Home.module.scss"
import { useAppSelector } from "../hooks";
import { Show, ShowInfo, Venue,Performance } from "../interfaces/types";
import Card from "./Card";
import ModalWrapper from "./ModalWrapper"
import LoginModal from "./Modals/LoginModal";
import RegisterModal from "./Modals/RegisterModal";


function Home() {

	//tendria que traerme todos los shows,despues buscar a cada uno por id, y ahi tengo toda la data
	const shows = useAppSelector((state) => state.shows.shows)
	const venues = useAppSelector((state) => state.shows.venues)
	const user = useAppSelector((state) => state.user.user)
	const searchBarInput = useAppSelector((state) => state.searchBar.showName)
	const [performances,setPerformances] = useState<Performance[]>([])
	const [categoryValue,setCategoryValue] = useState<string>("")
	const [venueValue,setVenueValue] = useState<string>("")
	const [loginModal,setLoginModal] = useState<boolean>(false)
	const [registerModal,setRegisterModal] = useState<boolean>(false)

	

	const pickOnTheFuture =  () => {
		const allPerformances = shows.flatMap((show) => {
			return show.performances
		})
		//buscamos todas las performances

		const today = new Date()


		const sortedPerformances = allPerformances.sort((a,b) => {
			const timeA = new Date(a.date).getTime()
			const timeB = new Date(b.date).getTime();
			return timeA - timeB
		})
		//sorteamos de manera ascendente

		const performancesToShow: Performance[] = sortedPerformances.filter((performance) => new Date(performance.date) >= today)
		.filter((performance) => performance.active)
		//filtramos las performances por las que sean en el futuro, y esten activas

		setPerformances(performancesToShow)
	}



	

	useEffect(() => {
		if(shows.length > 0 && venues.length > 0){
			//si ya se cargaron los datos, filtramos por las que esten en el futuro
			pickOnTheFuture()
		}
	
	},[shows,venues])


	//Estas funciones de abajo son aquellas que nos permiten controlar los estados
	// de los modals. Las pasamos como parametro a cada modal para que 
	//las sepa usar
	const toggleRegister = () => {
		setLoginModal(false)
		setRegisterModal(true)
	}

	const closeLogin = () => {
		setLoginModal(false)
	}

	const closeRegister=() => {
		setRegisterModal(false)
	}


	const categorys = ["musical","concert","theater"]
	//Categorias validas de shows

	return (
		<>
			<div className={style.cartelera}></div>
			<p className={style.title}>Te damos la Bienvenida a Allaria+ Live!</p>
			<p className={style.description}>En Allaria+ Live! vas a encontrar cientos de eventos y comprar entradas en el momento sin hacer filas virtuales. Iniciá sesión para poder visualizas tus entradas y el saldo de tu cuenta.</p>


			{
				//Esto es para sacar el boton de ingresar cuando ya se logeo
				user === null &&(
				<div className={style.loginContainer}>
				<button className={style.loginButton} onClick={ () => setLoginModal(!loginModal)}>Ingresar</button>
			</div>)

			}
			

			<div className={style.filterContainer}>
				<p>Proximos Eventos</p>
				<div className={style.filter}>
					<select name="Tipo de evento" 
					id="" defaultValue="" onChange={(e) => setCategoryValue(e.target.value)}
					className={style.selectBox}
					>
						<option value = "">Tipo de evento</option>
						{categorys.map((category) => {
							return <option key={category}>{category}</option>
						})}
					</select>

					

					
					<select name="Recinto" id="" 
					className={style.selectBox}
					defaultValue="" onChange={(e) => setVenueValue(e.target.value)}>
						<option value = "">Recinto</option>
						{
							venues.map((venue) => {
								return <option key ={venue.name}>{venue.name}</option>
							})
						}
					</select>
				</div>
			</div>


			{
				loginModal && (
					<ModalWrapper>
						<LoginModal toggleModals={toggleRegister} closeLogin={closeLogin}>
							
						</LoginModal>
					</ModalWrapper>
				)
			}

			{
				registerModal && (
					<ModalWrapper>
						<RegisterModal toggleRegister={closeRegister}>

						</RegisterModal>
					</ModalWrapper>
				)
			}

			<div className={style.cardContainerHome}>
				{
					performances
					.filter((performance) => {
						const show = shows.map((show) => show.show).filter((show) => show.id === performance.showId)[0]
						const nameShow = show.name.toLocaleLowerCase()
						return nameShow.includes(searchBarInput.toLocaleLowerCase())
					})
					//lo de arriba filtrapor el searchBar

					.filter((performance) => {
						const show = shows.map((show) => show.show).filter((show) => show.id === performance.showId)[0]
						return show.category.includes(categoryValue)
					})

					//esto de arriba filtra por la categoria

					.filter((performance) => {
						const venue = venues.filter((venue) => venue.id === (shows.map((show) => show.show).filter((show) => show.id === performance.showId)[0]).id)[0]

						return venue.name === venueValue || (venueValue === "")
					})
					//Esto filtra por el nombre de la venue
					
					
					
					
					.map((performance) => {
						return <Card key={performance.id} 
								performance={performance}
								show={shows.map((show) => show.show).filter((show) => show.id === performance.showId)[0]}
								remainingTickes={shows.flatMap((showInfo) => showInfo.remainingTickets).filter((remaining) => remaining.performanceId === performance.id)
								}
								venue = {venues.filter((venue) => venue.id === (shows.map((show) => show.show).filter((show) => show.id === performance.showId)[0]).id)[0].name}/>
					})
				}
			</div>

			
		</>
	);
}

export default Home;
