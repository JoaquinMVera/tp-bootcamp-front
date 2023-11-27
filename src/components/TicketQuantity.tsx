import React, { useState } from 'react';
import style from "../styles/TicketQuantity.module.scss"
import { useEffect } from 'react';

const TicketQuantity = ({inputUpdate,ticketPool}) => {
  // Estado para almacenar el valor actual
  const [quantity, setQuantity] = useState(0);

  // Función para manejar el cambio directo en el campo de texto
  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;
    setQuantity(Math.min(value,Math.min(4,ticketPool)));
  };

  // Funciones para aumentar y disminuir la cantidad
  const increaseQuantity = () => {
    if(quantity < Math.min(4,ticketPool)){
        setQuantity(quantity + 1);

    }
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    inputUpdate(quantity);
  }, [quantity]);

  return (
    <div className={style.container}>
      {/* Botón de disminuir cantidad */}
      <button onClick={decreaseQuantity} className={style.buttonInput}>-</button>

      {/* Campo de texto para ingresar la cantidad */}

      <div className={style.textInput}>
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        id = "ticketAmountSelector"
        
      />
      </div>
      

      {/* Botón de aumentar cantidad */}
      <button onClick={increaseQuantity} className={style.buttonInput}>+</button>
    </div>
  );
};

export default TicketQuantity;
