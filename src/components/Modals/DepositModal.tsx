import style from "../../styles/DepositModal.module.scss"
import { useState } from "react";
import { useAppSelector,useAppDispatch } from "../../hooks";
import { User } from "../../interfaces/types";
import { updateUser } from "../../slices/userSlice";



const DepositModal = ({toggleAfterModal}) => {


    const dispatch = useAppDispatch();
    const [depositAmount,setDepositAmount] = useState<number>(0)
    const [errorInput,setErrorInput] = useState<boolean>(false)
    const user = useAppSelector((state) => state.user.user)
     

    const handleChange= (newAmount:number) => {
        if(newAmount <= 0){
            setErrorInput(true)
            return
        }

        setErrorInput(false)
        setDepositAmount(newAmount)
    }
    
    const deposit = async () => {
            const dataAmount = {
                amount: depositAmount,
            }
            //Body que nos espera del request

            try{

                const depositResponse = await fetch(`http://localhost:9000/users/${user?.id}`,{
                method: 'PUT',
                headers: {
                     'Content-Type': 'application/json',
             },
                 body: JSON.stringify(dataAmount)
            })

         const updatedUser :User = await depositResponse.json()

         dispatch(updateUser(updatedUser))
         toggleAfterModal(true)

            } catch {
                toggleAfterModal(false)
                console.log("error en el deposito")
            }

    }

    return (
        <>
           <div className={style.registerTitleContainer}>
                <div className={style.welcome}><p>Tu billetera de <span className={style.allariaTitle}>Allaria+ </span></p> </div>
                <p className = {style.registerTitle}>Ingresa dinero a tu cuenta</p>
           </div>
            <div className={style.userInputContainer}>
                <label>Ingresa el monto
                <input type="number"
                className={style.numericInput}
                placeholder="$1,00" onChange={(e) => handleChange(parseInt(e.target.value))}
                    />

{
                    errorInput && (
                        <p>Monto invalido, pone uno mayor a 0!</p>
                    )
                }

                </label>
            </div>
            <button className = {style.registerButton} onClick={() => deposit() } disabled={errorInput}  >Ingresar dinero</button>
        </>
    )
}

export default DepositModal