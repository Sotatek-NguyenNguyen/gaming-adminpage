import React from "react";
import ReactDOM from "react-dom";

const BackDrops = (props) => {
  return <div className="backdrop" onClick={props.onClick}></div>;
};

const ModalOverlay = () => {
    return <div className="modal">
        <div className="modal__header">

        </div>

        <div className="modal__content">

        </div>
        
        <div className="modal__actions">

        </div>
    </div>
}

function Modal() {
  return <React.Fragment>
      
  </React.Fragment>;
}

export default Modal;
