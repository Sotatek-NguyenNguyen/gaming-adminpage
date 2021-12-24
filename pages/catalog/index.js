import React from "react";
import Layout from "../../components/Layouts/Layout";
import Input from "../../components/UI/Input.js";
import Button from "../../components/UI/Button.js";
import CustomizedAccordions from "../../components/UI/Accordion";

function CatalogPage() {
  return (
    <div className="catalog">
      <div className="form-container">
        <div className="form-container__header">
          <h4>Game Balance</h4>
        </div>
        
        <div className="form-container__content">
          <form>
            <label htmlFor="actual-game">
              <h5>Actual game balance</h5>
            </label>
            <Input id="actual-game" />

            <label htmlFor="in-game">
              <h5>In-game balance</h5>
            </label>
            <Input id="in-game" />

            <div className="form-actions">
              <Button className='btn-main--outline'>Withdraw</Button>
              <Button className='btn-main'>Deposit</Button>
            </div>
          </form>
        </div>  
      </div>
      <CustomizedAccordions />
    </div>
  );
}

export default CatalogPage;

CatalogPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
