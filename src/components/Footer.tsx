import style from "../styles/Footer.module.scss"
import facebook from "../assets/facebook.svg"
import twitter from "../assets/twitter.svg"
import linkedin from "../assets/linkedin.svg"
import logo from "../assets/logo.svg"


const Footer = () => {
	return(
		<footer className={style.container}>
			<div className={style.footerFrame}>
			<div className={style.iconContainer}>
            	<img src={logo} alt="Allaria+Live Logo" />
        	</div>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit recusandae optio sapiente, quos ea ut dolor illum modi, laudantium facilis delectus numquam in voluptatibus nisi ipsam temporibus saepe amet.</p>
				<div className={style.mediaFrame}>
					<img src={facebook} alt="Facebook logo" className={style.mediaIcon} />
					<img src={twitter} alt="Twitter logo" className={style.mediaIcon} />
					<img src={linkedin} alt="Linkedin logo" className={style.mediaIcon} />
				</div>
			</div>
		</footer>
	)
}

export default Footer;