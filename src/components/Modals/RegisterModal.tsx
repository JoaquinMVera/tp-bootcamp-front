import style from "../../styles/RegisterModal.module.scss"
import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { User } from "../../interfaces/types";
import { updateUser } from "../../slices/userSlice";



const RegisterModal = ({toggleRegister}) => {


    const dispatch = useAppDispatch();
    const [username,setUsername] = useState<string>("")
    const [errorInput,setErrorInput] = useState<boolean>(false)
    const regexUsername = /^(?=.*[A-Z]).{8,}$/;

    const createUser = async () => {
        const dataUser = {
            name: username,
            email: 'todo@gmail.com'
        }
        //El body que esperan desde elback

        try {

            const createResponse = await fetch(`http://localhost:9000/users`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataUser)
            })

            const createData :User = await createResponse.json()
            
            dispatch(updateUser(createData))
            toggleRegister()
        } catch {
            console.log("error")
        }
    }

    //Funcion para validar que el nombre cumpla los 8 caracteres y el mayuscula
    const validateName = ((name:string) => {
        const nameTrimed = name.trim()


        if(regexUsername.test(nameTrimed)){
            setErrorInput(false)
            setUsername(nameTrimed)
        } else {
            setErrorInput(true)
        }
        
    })

    return (
        <>
           <div className={style.registerTitleContainer}>
                <div className={style.welcome}><p>Bienvenido a <span className={style.allariaTitle}>Allaria+ Live!</span></p> </div>
                <p className = {style.registerTitle}>Crea tu nombre de usuario</p>
                <div className={style.userCondition}><p>Tu nombre de usuario debe contener al menos 8 caracteres y una mayúscula </p></div>
           </div>
            <div className={style.userInputContainer}>

                <label className={style.inputLabel}>Nuevo nombre de usuario
                <input type="text" placeholder="Nombre de usuario" onChange={(e) => validateName(e.target.value)}
                    className={errorInput ? style.inputError : ""}/>

                </label>
                {
                    errorInput && (
                        <p>Nombre de usuario invalido,intente nuevamente</p>
                    )
                }
                

                
            </div>
            <button className = {style.registerButton} onClick={() => createUser()} disabled={errorInput}  >Crear usuario</button>
        </>
    )
}

export default RegisterModal