import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "../UI/Button.js";
import Input from "../../components/UI/Input.js";
import { useGlobal, useAlert } from "../../hooks";

const BackDrops = (props) => {
  return <div className="backdrop" onClick={props.onCloseModal}></div>;
};

const ModalOverlay = (props) => {
  const {
    onCloseModal,
    title,
    address,
    tokenAmount,
    inputDisabled,
    editableAddress,
  } = props;
  const amountRef = useRef();
  const addressRef = useRef();
  const [errors, setErrors] = useState(null);
  const { alertError } = useAlert();
  const { playerList } = useGlobal();

  const findWalletAddress = (address) =>
    playerList.some((player) => player.address === address);

  const handleClick = () => {

    if (inputDisabled) props.onClick();
    if (!inputDisabled && editableAddress){
      const _errors = {...errors};
      if (addressRef?.current.value === ""){
        _errors['withDraw'] = 'Destination address cannot be empty';
        return setErrors(_errors);
      };
      if (!findWalletAddress(addressRef?.current.value)){
        _errors['withDraw'] = ' ';
        alertError('The wallet address is not found in Gaming Service. Either the wallet is not registered with Gaming Service or has been de-registered');
        return setErrors(_errors);
      };

      props.onClick(addressRef?.current.value, amountRef?.current.value);
      setErrors(null);
    }
      
    if (!inputDisabled && !editableAddress)
      props.onClick(amountRef?.current?.value);
  };

  return (
    <div className="modal">
      <div className="modal__title">{title}</div>

      <div className="modal__content">
        {!editableAddress ? (
          <div className="address">{address}</div>
        ) : (
          <Input
            placeholder="Destination Address: "
            type="string"
            style={{ marginBottom: 10 }}
            required={true}
            ref={addressRef}
            error={errors?.withDraw}
          />
        )}
        <Input
          placeholder={`Token Amount*: ${tokenAmount ? tokenAmount : ""}`}
          min="0"
          pattern="[0-9]"
          type="number"
          id="token-amount"
          disabled={inputDisabled}
          ref={amountRef}
          required={true}
        />
      </div>

      <div className="modal__actions">
        <Button className="btn-main--outline" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button onClick={handleClick} className="btn-main">
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
