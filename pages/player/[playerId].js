import React, { useState, useEffect, useCallback } from "react";
import { useAuth, useGlobal } from "../../hooks";
import Layout from "../../components/Layouts/Layout";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Inventory from "../../components/playerTransaction/inventory";
import TransactionsHistory from "../../components/playerTransaction/transactionsHistory";
import { useRouter } from "next/router";
import { getJSON } from "../../common";

function PlayerDetail() {
  const [tab, setTab] = useState("inventory");
  const [balance, setBalance] = useState('');
  const router = useRouter();
  const {gameData} = useGlobal();
  const { tokenDecimals } = gameData;

  const {isLoggined} = useAuth();

  const changeTab = (tab) => () => {
    setTab(tab);
  };

  const playerId = `${router.query.playerId}`;

  const getWalletAddress = useCallback(() => {
    getJSON(`/admin/users?page=1&pageSize=20&address=${router.query.playerId}`)
    .then( res => {
      const exactBalance = (res?.data[0]?.balance) / Math.pow(10, tokenDecimals);
      setBalance(exactBalance);
    })
    .catch(err => {throw err});
  }, [])

  useEffect(() => {
    getWalletAddress();
  }, [getWalletAddress])

  useEffect(() => {
    const loginStatus = isLoggined();
    if (!loginStatus) router.replace("/")
  }, []);

  return (
    <div className="container--custom players-contain">
      <section className="card-custom card__display">
        <h5 className="card__title">Player Info</h5>
        <div className="card__body">
          <div>
            <label htmlFor="playerID">Wallet Address: <span className="label-required">*</span> </label>
            <input 
              type="text" 
              id="playerID" 
              className="input-main large disable" 
              value={playerId}
              disabled 
            />
          </div>

          <div>
            <label htmlFor="walletAddress">Current Balance:</label>
            <input
              type="text"
              id="walletAddress"
              value={balance}
              className="input-main large disable"
              disabled
            />
          </div>
        </div>
      </section>

      <section className="player__info">
        <div className="info__tabs">
          <p
            onClick={changeTab("inventory")}
            style={{ 
              fontWeight: tab === "inventory" ? 600 : 400, 
              color: tab === "inventory" ? '#6823BF' : '#9F99B3'
            }}
          >
            {" "}
            Inventory{" "}
          </p>
          <p
            onClick={changeTab("transactionHistory")}
            style={{ 
              fontWeight: tab === "transactionHistory" ? 600 : 400, 
              color: tab === "transactionHistory" ? '#6823BF' : '#9F99B3'
            }}
          >
            {" "}
            Transaction History{" "}
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

export default PlayerDetail;

PlayerDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
