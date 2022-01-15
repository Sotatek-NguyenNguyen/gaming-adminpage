import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "../UI/Button.js";
import Input from "../../components/UI/Input.js";
import { getJSON } from "../../common";
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
    amountInGame
  } = props;
  const amountRef = useRef();
  const addressRef = useRef();
  const [errors, setErrors] = useState(null);

  // validate withdraw balance
  const validateAmountWithDraw = (amount, _errors) => {
    if(amount === ''){
      _errors['balanceAmount'] = 'This field is required';
      return false;
    }else if (amount == 0) {
      _errors['balanceAmount'] = 'Input Token amount must be larger than 0';
      return false;
    } else if (amount > amountInGame) {
      _errors['balanceAmount'] = 'Input Token amount cannot be larger than Unallocated in-game balance';
      return false;
    } else{ 
      _errors['balanceAmount'] = null;
      return true
    };
  };
  const checkValidateBalanceWithDraw = () => {
    const _errors = {...errors};

    if (addressRef?.current.value === ""){
      _errors['balanceAddress'] = 'This field is required';
    }else{
      _errors['balanceAddress'] = null;
    }

    const validatedAmount = validateAmountWithDraw(amountRef?.current.value, _errors);
    if (addressRef?.current.value === "" || !validatedAmount) {
      setErrors({
        ..._errors,
        message: 'test',
        validatedAmount
      });
      return false;
    };

    return true;
  }

  // validate deposit balance
  const validateDepositAmount = (amount) => {
    const _errors = {...errors};

    if(amount === ''){
      _errors['balanceAmount'] = 'This field is required';
      setErrors(_errors);
      return false;
    }else if (amount == 0) {
      _errors['balanceAmount'] = 'Input Token amount must be larger than 0';
      setErrors(_errors);
      return false;
    } else if (amount > amountInGame) {
      _errors['balanceAmount'] = "Deposit amount input exceeded Wallet balance";
      setErrors(_errors);
      return false;
    } else{
      _errors['balanceAmount'] = null;
      setErrors(_errors);
      return true;
    } 
  };

  const handleClick = () => {
    if (inputDisabled) props.onClick();

    if (!inputDisabled && editableAddress){
      if(!checkValidateBalanceWithDraw()) return;
      props.onClick(addressRef?.current.value, amountRef?.current.value);
    }
    
    if (!inputDisabled && !editableAddress){
      if (!validateDepositAmount(amountRef?.current?.value)) return;
      props.onClick(amountRef?.current?.value);
    }
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
            error={errors?.balanceAddress}
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
          error={errors?.balanceAmount}
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
