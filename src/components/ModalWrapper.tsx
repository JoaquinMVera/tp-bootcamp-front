import { ReactNode } from "react"
import style from "../styles/Modal.module.scss"

interface ModalWrapperProps{
    children:ReactNode
}



const ModalWrapper = ({children}:ModalWrapperProps) => {

    return (
        <>
        <div className={style.modalOverlay}>
            <div className = {style.modalContainer}>
                
                <div className={style.modalContent}>
                    {children}
                </div>
                
              </div>
        </div>
            
        </>
    )
}









export default ModalWrapper