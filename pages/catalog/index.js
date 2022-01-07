import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layouts/Layout";
import Input from "../../components/UI/Input.js";
import Tooltip from "../../components/UI/Tooltip";
import Button from "../../components/UI/Button.js";
import SimpleAccordion from "../../components/UI/Accordion";
import Modal from "../../components/UI/Modal.js";

import Inventory from "../../components/catalogTransaction/inventory";
import TransactionsHistory from "../../components/catalogTransaction/transactionsHistory";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { getJSON, sendJSON } from "../../common";
import { useAlert, useAuth, useGlobal } from "../../hooks";

function CatalogPage() {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showGrantTokenModal, setShowGrantTokenModal] = useState(false);
  const [showDeductTokenModal, setShowDeductTokenModal] = useState(false);
  const [tab, setTab] = useState("inventory");
  const [actualGameBalance, setActualGameBalance] = useState("");
  const [allocatedInGameBalance, setAllocatedInGameBalance] = useState("");
  const [unallocatedInGameBalance, setUnallocatedInGameBalance] = useState("");
  const [tokenData, setTokenData] = useState({});
  const {alertError, alertSuccess} = useAlert();
  const { isLoggined } = useAuth();
  const {gameData} = useGlobal();
  const router = useRouter();

  const changeTab = (tab) => () => {
    setTab(tab);
  };

  const handleCloseModal = () => {
    setShowDepositModal(false);
    setShowWithdrawModal(false);
    setShowGrantTokenModal(false);
    setShowDeductTokenModal(false);
  };

  const DepositModal = () => {
    return (
      <Modal
        title="Confirm Deposit Token?"
        address={
          <>
            Destination Address <br />
            {gameData?.walletAddress}
          </>
        }
        onCloseModal={handleCloseModal}
        inputDisabled={false}
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
        inputDisabled={false}
        onClick={withDrawFromActualGameBalance}
      />
    );
  };

  const GrantTokenModal = () => {
    return (
      <Modal
        title="Confirm Sending Token?"
        onClick={sendingToken}
        tokenAmount={tokenData.amount}
        address={
          <>
            Destination Address <br />
            {tokenData?.userAddress}
          </>
        }
        onCloseModal={handleCloseModal}
        inputDisabled={true}
      />
    );
  };

  const DeductTokenModal = () => {
    return (
      <Modal
        title="Confirm Deduct Token?"
        onClick={deductToken}
        tokenAmount={tokenData.amount}
        address={
          <>
            Originate Wallet Address <br />
            {tokenData?.userAddress}
          </>
        }
        onCloseModal={handleCloseModal}
        inputDisabled={true}
      />
    );
  };

  const withDrawFromActualGameBalance = async (amount) => {
    try {
      const res = await sendJSON(`/admin/game-balance/withdrawals`, {
        userAddress: "DBRxc9dpWEisSppdeFfFdjiXUso4XF4qhfRQ3Lq73wy7",
        amount,
      });
      console.log("withdraw", res);
      setShowWithdrawModal(false);
    } catch (error) {
      console.error(err.message);
    }
  };

  const grantTokenHandler = (amount, userAddress, note) => {
    setShowGrantTokenModal(true);
    setTokenData({ amount, userAddress, note });
  };

  const deductTokenHandler = (amount, userAddress, note) => {
    setShowDeductTokenModal(true);
    setTokenData({ amount, userAddress, note });
  };

  const sendingToken = () => {
    sendJSON(`/admin/users/grant-token`, tokenData)
      .then((res) => {
        if (res.success) alertSuccess('Sendind token successfully!');
        if (res.statusCode === 404) alertError('User not found!');
      })
      .finally(() => {
        getGameBalance();
        setTokenData({});
        setShowGrantTokenModal(false);
      })
      .catch((err) => console.error(err.message));
  };

  const deductToken = () => {
    sendJSON(`/admin/users/deduct-token`, tokenData)
      .then((res) => {
        if (res.success) alertSuccess('Deduct token successfully!');
        if (res.statusCode === 404) alertError('User not found!');
      })
      .finally(() => {
        getGameBalance();
        setTokenData({});
        setShowDeductTokenModal(false);
      })
      .catch((err) => console.error(err.message));
  };

  const getGameBalance = async () => {
    try {
      const res = await getJSON(`/admin/game-balance`);
      setActualGameBalance(res?.actualGameBalance);
      setUnallocatedInGameBalance(res?.unallocatedInGameBalance);
      setAllocatedInGameBalance(res?.allocatedInGameBalance);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const loginStatus = isLoggined();
    if (!loginStatus) router.replace("/")
  }, []);

  useEffect(() => {
    getGameBalance().catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="catalog">
      {showDepositModal && <DepositModal />}
      {showWithdrawModal && <WithDrawModal />}
      {showGrantTokenModal && <GrantTokenModal />}
      {showDeductTokenModal && <DeductTokenModal />}

      <div className="card-custom container--custom">
        <h5 className="card__title">Game Balance</h5>

        <div className="card__body">
          <form className="form-content" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="actual-game" className="game-label">
                <h5>Actual game balance</h5>
                <Tooltip info="Actual amount of Token in Smart Contract"/>
              </label>
              <Input
                disabled
                type="number"
                id="actual-game"
                className="input-main large disable"
                value={actualGameBalance}
              />
            </div>
            
            <div>
              <label htmlFor="unallocated" className="game-label">
                <h5>Unallocated in-game balance</h5>
                <Tooltip info="Balance deposited by Admin and has not been granted to any players"/>
              </label>
              <Input 
                disabled 
                type="number" 
                id="unallocated" 
                className="input-main large disable"
                value={unallocatedInGameBalance} 
              />
            </div>
            
            <div>
              <label htmlFor="allocated" className="game-label">
                <h5>Allocated in-game balance</h5>
                <Tooltip info="Balance owned by All Players"/>
              </label>
              <Input 
                disabled 
                type="number" 
                id="allocated" 
                className="input-main large disable"
                value={allocatedInGameBalance} 
              />
            </div>

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
      
      <SimpleAccordion
        onGrantToKenSubmit={grantTokenHandler}
        onDeductTokenSubmit={deductTokenHandler}
      />

      <section className="player__info container--custom">
        <div className="info__tabs">
          <p
            onClick={changeTab("inventory")}
            style={{ 
              fontWeight: tab === "inventory" ? 700 : 400, 
              color: tab === "inventory" ? '#6823BF' : '#9F99B3'
            }}
          >
            Inventory
          </p>
          <p
            onClick={changeTab("transactionHistory")}
            style={{ 
              fontWeight: tab === "transactionHistory" ? 700 : 400, 
              color: tab === "transactionHistory" ? '#6823BF' : '#9F99B3'
            }}
          >
            Transaction History
          </p>
        </div>
        <div>
          {
            tab === "inventory" ? 
            <Inventory /> : 
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TransactionsHistory />
            </LocalizationProvider>
          }
        </div>
      </section>
    </div>
  );
}

export default CatalogPage;

CatalogPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
