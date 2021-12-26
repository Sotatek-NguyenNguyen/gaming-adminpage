import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import Input from "../../components/UI/Input.js";
import Button from "../../components/UI/Button.js";
import SimpleAccordion from "../../components/UI/Accordion";
import Modal from "../../components/UI/Modal.js";

import Inventory from '../../components/playerTransaction/inventory';
import TransactionsHistory from '../../components/playerTransaction/transactionsHistory';

function CatalogPage() {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showGrantTokenModal, setShowGrantTokenModal] = useState(false);
  const [showDeductTokenModal, setShowDeductTokenModal] = useState(false);
  const [tab, setTab] = useState('inventory');

  const changeTab = (tab) => () => {
    setTab(tab);
  }

  const handleCloseModal = () => {
    setShowDepositModal(false);
    setShowWithdrawModal(false);
    setShowGrantTokenModal(false);
    setShowDeductTokenModal(false);
  };

  const handleGameBalanceSubmit = (e) => {
    e.preventDefault();
  };

  const DepositModal = () => {
    return (
      <Modal
        title="Confirm Deposit Token?"
        address={
          <>
            Destination Address <br />
            4zj7KF13agrr3VYEt3RxxhDtzHGQmL7KdhzGZ9nzp1xD
          </>
        }
        onCloseModal={handleCloseModal}
      />
    );
  };

  const WithDrawModal = () => {
    return (
      <Modal
        title="Confirm Withdraw Token?"
        address={
          <>
            Destination Address <br />
            4zj7KF13agrr3VYEt3RxxhDtzHGQmL7KdhzGZ9nzp1xD
          </>
        }
        onCloseModal={handleCloseModal}
      />
    );
  };

  const GrantTokenModal = () => {
    return (
      <Modal
        title="Confirm Sending Token?"
        address={
          <>
            Destination Address <br />
            4zj7KF13agrr3VYEt3RxxhDtzHGQmL7KdhzGZ9nzp1xD
          </>
        }
        onCloseModal={handleCloseModal}
      />
    );
  };

  const DeductTokenModal = () => {
    return (
      <Modal
        title="Confirm Deduct Token?"
        address={
          <>
            Originate Wallet Address  <br />
            4zj7KF13agrr3VYEt3RxxhDtzHGQmL7KdhzGZ9nzp1xD
          </>
        }
        onCloseModal={handleCloseModal}
      />
    );
  };

  return (
    <div className="catalog">
      {showDepositModal && <DepositModal />}
      {showWithdrawModal && <WithDrawModal />}
      {showGrantTokenModal && <GrantTokenModal />}
      {showDeductTokenModal && <DeductTokenModal />}

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
              <Button
                className="btn-main--outline"
                onClick={() => setShowWithdrawModal(true)}
              >
                Withdraw
              </Button>
              <Button
                className="btn-main"
                onClick={() => setShowDepositModal(true)}
              >
                Deposit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <SimpleAccordion onGrantToKenSubmit={() => setShowGrantTokenModal(true)}
      onDeductTokenSubmit={() => setShowDeductTokenModal(true)} />

      <section className='player__info container--custom'>
        <div className='info__tabs'>
          <p onClick={changeTab('inventory')}
             style={{ fontWeight: tab === 'inventory' ? 700 : 400 }}
          > Inventory </p>
          <p onClick={changeTab('transactionHistory')}
             style={{ fontWeight: tab === 'transactionHistory' ? 700 : 400 }}
          > Transaction History </p>
        </div>
        <div>
          {tab === 'inventory' ? <Inventory /> : <TransactionsHistory />}
        </div>
      </section>
    </div>
  );
}

export default CatalogPage;

CatalogPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
