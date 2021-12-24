import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "../UI/Button.js";
import Input from "../../components/UI/Input.js";

const BackDrops = (props) => {
  return <div className="backdrop" onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="modal__title">CONFIRM DEPOSIT TOKEN?</div>

      <div className="modal__content">
        <div className="address">
          Destination Address <br />
          4zj7KF13agrr3VYEt3RxxhDtzHGQmL7KdhzGZ9...
        </div>
        <Input placeholder="Token Amount*" id="token-amount" />
      </div>

      <div className="modal__actions">
        <Button className="btn-main--outline">Cancel</Button>
        <Button className="btn-main">Confirm</Button>
      </div>
    </div>
  );
};

function Modal(props) {
  const [mounted, setMounted] = useState(false);
  const portalEl = document.getElementById("modal-root");

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <React.Fragment>
      {ReactDOM.createPortal(<BackDrops />, portalEl)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalEl
      )}
    </React.Fragment>
  ) : null;
}

export default Modal;
