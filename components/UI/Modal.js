import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "../UI/Button.js";
import Input from "../../components/UI/Input.js";

const BackDrops = (props) => {
  return <div className="backdrop" onClick={props.onCloseModal}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="modal__title">Confirm Deposit Token?</div>

      <div className="modal__content">
        <div className="address">
          Destination Address <br />
          4zj7KF13agrr3VYEt3RxxhDtzHGQmL7KdhzGZ9...
        </div>
        <Input placeholder="Token Amount*" min="0" type="number" id="token-amount" />
      </div>

      <div className="modal__actions">
        <Button className="btn-main--outline" onClick={props.onCloseModal}>Cancel</Button>
        <Button className="btn-main">Confirm</Button>
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
      {ReactDOM.createPortal(<BackDrops onCloseModal={props.onCloseModal} />, document.getElementById("modal-root"))}
      {ReactDOM.createPortal(
        <ModalOverlay onCloseModal={props.onCloseModal}>{props.children}</ModalOverlay>,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  ) : null;
}

export default Modal;
