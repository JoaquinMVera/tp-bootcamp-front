import style from "../../styles/ConfirmationModal.module.scss"
import successIcon from "../../assets/sucessValidation.svg"
import failureIcon from "../../assets/failureValidation.svg"


const ConfirmationModal = ({success,toggleConfirmation}) => {




    return (
        <>
            <div className={style.container}>

            {
                success && (
                    <>
                    <img src={successIcon} alt="iconito verde" className={style.icon} />
                    <div className={style.textContainer}>
                        <p className={style.successText}>Se acredito el dinero en tu cuenta</p>
                    </div>
                    </>
                    
                )
            }

            {
                (!success) && (
                    <>
                    <img src={failureIcon} alt="iconito rojo" className={style.icon} />
                    <div className={style.textContainer}>
                        <p className={style.failureText}>Algo fallo al ingresar dinero</p>
                    </div>
                    </>
                )
            }


            </div>
            

           <div className={style.buttonContainer}>
            <button className = {style.closeButton} onClick={() => toggleConfirmation() }   >Cerrar</button>
           </div>
        </>
    )
}

export default ConfirmationModal