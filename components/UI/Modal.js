import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "../UI/Button.js";
import Input from "../../components/UI/Input.js";

const BackDrops = (props) => {
  return <div className="backdrop" onClick={props.onCloseModal}></div>;
};

const ModalOverlay = (props) => {
  const { onCloseModal, title, address, tokenAmount, inputDisabled } = props;
  const amountRef = useRef();
  const handleClick = () => {
    if (inputDisabled) props.onClick();
    else props.onClick(amountRef?.current?.value)
  };
  return (
    <div className="modal">
      <div className="modal__title">{title}</div>

      <div className="modal__content">
        <div className="address">{address}</div>
        <Input
          placeholder={`Token Amount*: ${tokenAmount ? tokenAmount : ""}`}
          min="0"
          type="number"
          id="token-amount"
          disabled={inputDisabled}
          ref={amountRef}
        />
      </div>

      <div className="modal__actions">
        <Button className="btn-main--outline" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          onClick={handleClick}
          className="btn-main"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

function Modal(props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrops onCloseModal={props.onCloseModal} />,
        document.getElementById("modal-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay {...props}></ModalOverlay>,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  ) : null;
}

export default Modal;
