import React, { useEffect, useState, useCallback, useRef } from "react";
import Layout from "../../components/Layouts/Layout";
import Dropdown from "../../components/UI/Dropdown";
import Button from "../../components/UI/Button.js";
import DataTable from "../../components/UI/Table/DataTable";
import PaginationCustom from "../../components/UI/Pagination.js";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { getJSON } from "../../common";
import SearchIcon from "@mui/icons-material/Search";
import { useGlobal } from "../../hooks";

function PlayerPage() {
  const { isLoggined } = useAuth();
  const router = useRouter();
  const { gameData } = useGlobal();
  const { tokenDecimals } = gameData;
  const [players, setPlayers] = useState([]);
  const [totalPLayers, setTotalPlayers] = useState(0);
  const [paginate, setPaginate] = useState({
    currentPage: 1,
    totalPage: 1,
  });
  const [endpoint, setEndpoint] = useState(
    `/admin/users?page=${paginate.currentPage}&pageSize=20`
  );
  const [sortBy, setSortBy] = useState(null);
  const walletAddressRef = useRef(null);

  const getPlayers = useCallback(() => {
    getJSON(`${endpoint}`)
      .then((res) => {
        const _players = [...res.data];
        const playersCustom = _players.map((player) => {
          player.balance = (player.balance / Math.pow(10, tokenDecimals));
          player.status = "Active";
          return player;
        });
        setPlayers(playersCustom);
        setTotalPlayers(res.total);

        const paginate = {
          currentPage: res.page,
          totalPage: res.pageCount,
        };
        setPaginate(paginate);
      })
      .catch((err) => {
        throw err;
      });
  }, [endpoint]);

  const playersSortBy = (value) => {
    switch (value) {
      case 0:
        setSortBy("createdAt");
        break;
      case 1:
        setSortBy("balance");
        break;
      default:
        setSortBy(null);
    }
  };

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  const OnChangeCurrentPage = (event, value) => {
    setPaginate({
      currentPage: value,
      totalPage: paginate.totalPage,
    });

    // set endpoint
    const _endpoint = endpoint;
    let _endpointNextPage = _endpoint.split("&");
    _endpointNextPage[0] = _endpointNextPage[0].slice(0, -1) + value;

    let nextPage = _endpointNextPage.join("&");
    setEndpoint(nextPage);
  };

  const dropdownRef = useRef();

  const dropdownOptions = [
    { title: "Order result by", value: null },
    { title: "Newest to Oldest", value: 0 },
    { title: "Highest value to date", value: 1 },
  ];

  const search = () => {
    const currentEndpoint = "admin/users?page=1&pageSize=20";
    let newEndpoint = currentEndpoint;

    if (walletAddressRef.current.value.trim() !== "") {
      newEndpoint += `&address=${walletAddressRef.current.value}`;
    }
    if (sortBy !== null) {
      newEndpoint += `&sortBy=${sortBy}`;
    }

    setEndpoint(newEndpoint);
  };

  const clear = () => {
    walletAddressRef.current.value = "";
    setSortBy(null);
    // call function setSelectedToFirstValue of component dropdown
    dropdownRef.current.setSelectedToFirstValue();
    const endpointDefault = "admin/users?page=1&pageSize=20";
    setEndpoint(endpointDefault);
  };

  const exportPlayerHandler = async () => {
    try {
      const data = await getJSON(`/admin/users/excel`, {
        responseType: "blob",
      });
      const blob = new Blob([data], { type: "text/csv" });

      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, "players.xlsx");
      } else {
        const elem = window.document.createElement("a");
        elem.href = window.URL.createObjectURL(blob);
        elem.download = "players.xlsx";
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
      }
    } catch (error) {
      alert(error.message);
      console.error(error.message);
    }
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
    padding: "5px 7px",
  };
  const highlightLabel = {
    Active: {
      backgroundColor: "#00C48C",
    },
    Minted: {
      backgroundColor: "#FFA803",
    },
  };
  const tableColumns = [
    {
      title: "Wallet Address",
      field: "address",
      style: styleLinkTable,
      prefixLink: "/player",
    },
    { title: "Game Balance", field: "balance" },
    { title: "Create On", field: "createdAt", isDate: true },
    {
      title: "Status",
      field: "status",
      style: styleStatusTable,
      highlightLabel: highlightLabel,
    },
  ];

  useEffect(() => {
    const loginStatus = isLoggined();
    if (!loginStatus) router.replace("/");
  }, []);

  return (
    <div className="container--custom players-contain">
      <section className="interactive-list-player">
        <p>Total player: {totalPLayers}</p>
        <Button className="btn-main" onClick={exportPlayerHandler}>
          Export Player
        </Button>
      </section>

      <section className="card-custom">
        <h5 className="card__title">Query</h5>
        <div className="card__body card__query">
          <Dropdown
            options={dropdownOptions}
            ref={dropdownRef}
            className="card__query--dropdown"
            onChange={playersSortBy}
          />
          <input
            type="text"
            className="input-main large"
            ref={walletAddressRef}
            placeholder="Search players"
          />
          <div className="card__interactive">
            <Button className="btn-main" onClick={search}>
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
          message="No player available"
        />
        <PaginationCustom
          totalPage={paginate.totalPage}
          currentPage={paginate.currentPage}
          onChange={OnChangeCurrentPage}
        />
      </div>
    </div>
  );
}

export default PlayerPage;

PlayerPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
