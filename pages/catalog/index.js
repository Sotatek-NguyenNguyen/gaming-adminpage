import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import Input from "../../components/UI/Input.js";
import Button from "../../components/UI/Button.js";
import SimpleAccordion from "../../components/UI/Accordion";
import Modal from "../../components/UI/Modal.js";

function CatalogPage() {
  const [showModal, setShowModal] = useState(false);
  
  const handleCloseMdodal = () => {
    setShowModal(false);
  }

  const handleGameBalanceSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="catalog">
      {showModal && <Modal onCloseModal={handleCloseMdodal} />}
      <div className="form-container">
        <div className="form-container__header">
          <h4>Game Balance</h4>
        </div>

        <div className="form-container__content">
          <form onSubmit={handleGameBalanceSubmit}>
            <label htmlFor="actual-game">
              <h5>Actual game balance</h5>
            </label>
            <Input type="number" id="actual-game" />

            <label htmlFor="in-game">
              <h5>In-game balance</h5>
            </label>
            <Input type="number" id="in-game" />

            <div className="form-actions">
              <Button className="btn-main--outline">Withdraw</Button>
              <Button className="btn-main" onClick={() => setShowModal(true)}>Deposit</Button>
            </div>
          </form>
        </div>
      </div>
      <SimpleAccordion />
    </div>
  );
}

export default CatalogPage;

CatalogPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
