import React, { useState } from 'react'
import Modal from 'react-modal';

function ConciergeBackinStockDialog({ show, children, onClose}) {
  const [state, setState] = useState(true)
   const handleClose = () => {
     setState(false)
     onClose && onClose()
   }

  const customStyles = {
    content : {
      top                   : '20%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  return (
    <>
      <Modal isOpen={( show && state )}  style={customStyles}>
        <div className="text-right">
          <button type="button" onClick={handleClose}>
            x
          </button>
        </div>
        <section className="modal-main text-center">
          {children}
        </section>
      </Modal>
    </>
  )
}

export default ConciergeBackinStockDialog
