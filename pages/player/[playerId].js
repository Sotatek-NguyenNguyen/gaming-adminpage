import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks";
import Layout from "../../components/Layouts/Layout";

import Inventory from "../../components/playerTransaction/inventory";
import TransactionsHistory from "../../components/playerTransaction/transactionsHistory";
import { useRouter } from "next/router";

function PlayerDetail() {
  const [tab, setTab] = useState("inventory");
  const router = useRouter();

  const {isLoggined} = useAuth();

  const changeTab = (tab) => () => {
    setTab(tab);
  };

  const playerId = `ID#${router.query.playerId}`;

  useEffect(() => {
    const loginStatus = isLoggined();
    if (!loginStatus) router.replace("/")
  }, []);

  return (
    <div className="container--custom players-contain">
      <section className="card-custom card__display">
        <h5 className="card__title">Display</h5>
        <div className="card__body">
          <div>
            <label htmlFor="playerID">Player ID: <span className="label-required">*</span> </label>
            <input 
              type="text" 
              id="playerID" 
              className="input-main large disable" 
              value={playerId}
              disabled 
            />
          </div>

          <div>
            <label htmlFor="walletAddress"> Wallet Address:</label>
            <input
              type="text"
              id="walletAddress"
              className="input-main large disable"
              value="321asdf15asdf2as1d3fa54s2adf"
              disabled
            />
          </div>
        </div>
      </section>

      <section className="player__info">
        <div className="info__tabs">
          <p
            onClick={changeTab("inventory")}
            style={{ fontWeight: tab === "inventory" ? 700 : 400 }}
          >
            {" "}
            Inventory{" "}
          </p>
          <p
            onClick={changeTab("transactionHistory")}
            style={{ fontWeight: tab === "transactionHistory" ? 700 : 400 }}
          >
            {" "}
            Transaction History{" "}
          </p>
        </div>
        <div>
          {tab === "inventory" ? <Inventory /> : <TransactionsHistory />}
        </div>
      </section>
    </div>
  );
}

export default PlayerDetail;

PlayerDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
