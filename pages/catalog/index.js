import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layouts/Layout";
import Input from "../../components/UI/Input.js";
import Tooltip from "../../components/UI/Tooltip";
import Button from "../../components/UI/Button.js";
import SimpleAccordion from "../../components/UI/Accordion";
import Modal from "../../components/UI/Modal.js";

import Inventory from "../../components/playerTransaction/inventory";
import TransactionsHistory from "../../components/playerTransaction/transactionsHistory";
import { getJSON, sendJSON } from "../../common";
import { useAuth } from "../../hooks";

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
  const { isAuthenticated } = useAuth();
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
            4zj7KF13agrr3VYEt3RxxhDtzHGQmL7KdhzGZ9nzp1xD
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
            4zj7KF13agrr3VYEt3RxxhDtzHGQmL7KdhzGZ9nzp1xD
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
            4zj7KF13agrr3VYEt3RxxhDtzHGQmL7KdhzGZ9nzp1xD
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
        console.log("sending token", res);
        // need to show success, error message for user
      })
      .finally(() => {
        setTokenData({});
        setShowGrantTokenModal(false);
      })
      .catch((err) => console.error(err.message));
  };

  const deductToken = () => {
    sendJSON(`/admin/users/deduct-token`, tokenData)
      .then((res) => {
        console.log("deduct token", res);
        // need to show success, error message for user
      })
      .finally(() => {
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
    if (!isAuthenticated) router.replace("/");
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

      <div className="form-container">
        <div className="form-container__header">
          <h4>Game Balance</h4>
        </div>

        <div className="form-container__content">
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="actual-game" className="game-label">
              <h5>Actual game balance</h5>
              <Tooltip info="Actual amount of Token in Smart Contract"/>
            </label>
            <Input
              disabled
              type="number"
              id="actual-game"
              value={actualGameBalance}
            />

            <label htmlFor="unallocated" className="game-label">
              <h5>Unallocated in-game balance</h5>
              <Tooltip info="Balance deposited by Admin and has not been granted to any players"/>
            </label>
            <Input disabled type="number" id="unallocated" value={unallocatedInGameBalance} />

            <label htmlFor="allocated" className="game-label">
              <h5>Allocated in-game balance</h5>
              <Tooltip info="Balance owned by All Players"/>
            </label>
            <Input disabled type="number" id="allocated" value={allocatedInGameBalance} />

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
            style={{ fontWeight: tab === "inventory" ? 700 : 400 }}
          >
            Inventory
          </p>
          <p
            onClick={changeTab("transactionHistory")}
            style={{ fontWeight: tab === "transactionHistory" ? 700 : 400 }}
          >
            Transaction History
          </p>
        </div>
        <div>
          {tab === "inventory" ? <Inventory /> : <TransactionsHistory />}
        </div>
      </section>
    </div>
  );
}

export default CatalogPage;

CatalogPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
