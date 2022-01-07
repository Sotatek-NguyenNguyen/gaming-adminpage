import React, { useEffect, useState, useCallback, useRef } from "react";
import Layout from "../../components/Layouts/Layout";
import Dropdown from "../../components/UI/Dropdown";
import Button from "../../components/UI/Button.js";
import DataTable from "../../components/UI/Table/DataTable";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { getJSON } from "../../common";
import SearchIcon from '@mui/icons-material/Search';

function PlayerPage() {
  const { isLoggined } = useAuth();
  const router = useRouter();

  const [players, setPlayers] = useState([]);
  const [endpoint, setEndpoint] = useState('/admin/users?page=1&pageSize=20');
  const walletAddressRef = useRef(null);

  const getPlayers = useCallback(() => {
    getJSON(`${endpoint}`)
    .then( res => {
      const _players = [...res.data];
      const playersCustom = _players.map(player => {
        player.status = "Active";
        return player;
      });
      setPlayers(playersCustom);
    })
    .catch(err => {throw err});
  }, [endpoint]);

  useEffect(() => {
    getPlayers();
  }, [getPlayers])

  const dropdownOptions = [
    { title: "Order result by", value: null},
    { title: "Most recent logins", value: 0 },
    { title: "Highest value to date", value: 1 },
  ];

  const search = () => {
    if(walletAddressRef.current.value.trim() === '') return;
    const currentEndpoint = 'admin/users?page=1&pageSize=20';
    const newEndpoint = `${currentEndpoint}&address=${walletAddressRef.current.value}`;
    setEndpoint(newEndpoint);
  };

  const clear = () => {
    walletAddressRef.current.value = '';
    const endpointDefault = 'admin/users?page=1&pageSize=20';
    setEndpoint(endpointDefault);
  };

  const styleLinkTable = {
    color: "#00C48C",
  };
  const styleStatusTable = {
    color: "white",
    textTransform: "uppercase",
    border: "1px solid transparent",
    borderRadius: "32px",
    width: "80px",
    height: "40px",
    lineHeight: "31px",
    padding: "5px 7px"
  }
  const highlightLabel = {
    Active: {
      backgroundColor: "#00C48C"
    },
    Minted: {
      backgroundColor: "#FFA803"
    }
  }
  const tableColumns = [
    {
      title: "Wallet Address",
      field: "address",
      style: styleLinkTable,
    },
    { title: "Game Balance", field: "balance" },
    { title: "Create On", field: "createdAt", isDate: true },
    { title: "Status", field: "status", style: styleStatusTable, highlightLabel: highlightLabel },
  ];

  useEffect(() => {
    const loginStatus = isLoggined();
    if (!loginStatus) router.replace("/")
  }, []);

  return (
    <div className="container--custom players-contain">
      <section className="interactive-list-player">
        <p>Total player: 16</p>
        <Button  className="btn-main">
          Export Player
        </Button>
      </section>

      <section className="card-custom">
        <h5 className="card__title">Query</h5>
        <div className="card__body card__query">
          <Dropdown options={dropdownOptions} className='card__query--dropdown'/>
          <input type="text" className="input-main large" ref={walletAddressRef} placeholder="Search players" />
          <div className="card__interactive">
            <Button  className="btn-main" onClick={search}>
              <SearchIcon /> <span>Search</span>
            </Button>
            <Button className="btn-main--clear" onClick={clear}>
              Clear
            </Button>
          </div>
        </div>
      </section>

      <div style={{ marginTop: 20 }}>
        <DataTable
          columns={tableColumns}
          data={players}
          tableMaxHeight={300}
          message="No player available"
        />
      </div>
    </div>
  );
}

export default PlayerPage;

PlayerPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
