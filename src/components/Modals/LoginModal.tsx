import {  useState } from "react"
import style from "../../styles/Loginmodal.module.scss"
import { useAppDispatch } from "../../hooks";
import { User } from "../../interfaces/types";
import { updateBooking, updateUser } from "../../slices/userSlice";




const LoginModal = ({toggleModals,closeLogin}) => {

    const dispatch = useAppDispatch();
    const [username,setUsername] = useState<string>("")
    const [errorInput,setErrorInput] = useState<boolean>(false)

    const checkUser = async () => {

        try {

            const userResponse = await fetch(`http://localhost:9000/users`)
            const userData:User[] = await userResponse.json()

            const user = userData.find((user) => user.name === username)

            if(user !== undefined){


                const bookingResponse = await fetch(`http://localhost:9000/bookings?user=${user.id}`)
                const bookingData = await bookingResponse.json()

                dispatch(updateUser(user))
                dispatch(updateBooking(bookingData))
                setErrorInput(false)
                closeLogin()

            } else {
                setErrorInput(true)
            }


        } catch (error){

        }

    }




    return (
        <>
           <div className={style.loginTitleContainer}>
                <div className={style.welcome}><p>Bienvenido a <span className={style.allariaTitle}>Allaria+ Live!</span></p> </div>
                <p className = {style.loginTitle}>Ingresa tu nombre de usuario</p>
           </div>
            <div className={style.userInputContainer}>

                <label className={style.inputLabel}>Nombre de usuario
                    <input type="text" placeholder="Nombre de usuario" value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={errorInput ? style.inputError : ""}
                    />
                </label>
                {
                    errorInput && (
                        <p>Nombre de usuario no encontrado,intente nuevamente</p>
                    )
                }
                
                

                
            </div>
            <button className = {style.loginButton} onClick={() => checkUser()}>Ingresar</button>


            <div className = {style.newUserButtonContainer}>
                <p>¿Es la primera vez que entras?</p>
                <button className={style.newUserButton} onClick={() => toggleModals()}>Crear nuevo usuario</button>
            </div>
        </>
    )
}

export default LoginModal