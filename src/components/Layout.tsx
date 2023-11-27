import Navigation from './Navigation';
import Footer from './Footer';
import { Outlet } from "react-router-dom";
import style from "../styles/Layout.module.scss"
import { useAppSelector,useAppDispatch } from '../hooks';
import { ShowInfo,Show,Performance,Venue } from '../interfaces/types';
import { updateShows, updateVenues } from '../slices/eventsSlice';
import { useEffect } from 'react';

const Layout = () => {
    const shows = useAppSelector((state) => state.shows.shows)
	const dispatch = useAppDispatch();

        const getShows = async () => {
		try {
			const allShows = await fetch("http://localhost:9000/shows")
			const allShowsRes:Show[] = await allShows.json()
			
			//hasta aca tengo todos los shows, ahora, quiero armarme el show info para cada uno, es decir hacer lo siguiente
			for (const show of allShowsRes) {
				//este for casero es para hacer mas awaits, y el tema de los asyncs
				const showInfo = await fetch(`http://localhost:9000/shows/${show.id}`);
				const showInfoData:ShowInfo = await showInfo.json();
				//aca tengo toda la info
				dispatch(updateShows(showInfoData))
				//agrego al global este info show
			}

			const allVenues = await fetch("http://localhost:9000/venues")
			const allVenuesRes:Venue[] = await allVenues.json()
			dispatch(updateVenues(allVenuesRes))
			//traigo las venues y le meto la global


			
		} catch (error) {
			console.log("Error: ",error)
		}
	}


        useEffect(() => {
			if(shows.length === 0){
				getShows();
			}
			
		//me traigo las mas nuevas
	},[])



	return(
        <>
        <Navigation/>
		    <main className={style.mainContainer}>
            <Outlet />
		    </main>
        <Footer/>
        </>     
	)
}

export default Layout   