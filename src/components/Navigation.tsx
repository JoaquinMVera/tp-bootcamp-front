import style from "../styles/Navigation.module.scss"
import logo from "../assets/logo.svg"
import SearchBar from "./SearchBar";
import { useAppSelector} from "../hooks";
import userIcon from "../assets/user.svg"

const Navigation = () => {
	const user = useAppSelector((state) => state.user.user)




	return(
		<nav className={style.container}>
			<div className={style.navFrame}>
			<div className={style.iconContainer}>
            	<img src={logo} alt="Allaria+Live Logo" />
        	</div>
				<SearchBar/>
				{
					(user != null && (
						//Esto es para que cuando me cargen el user, aparezca en el nav
						<div className={style.userFrameContainer}>
							<img src={userIcon} alt="iconito usuario"/>
							<p>Hola, {user.name}</p>
						</div>
					))
				}
			</div>
		</nav>
	)
}

export default Navigation;