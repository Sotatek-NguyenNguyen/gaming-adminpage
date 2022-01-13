import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import CurrentAccountBadge from "./CurrentAccountBadge ";
import { getJSON } from "../../common";

function Topbar() {
  const router = useRouter();
  const pathName = router.pathname.replace("/", "");
  const pageTitle = pathName[0].toUpperCase() + pathName.slice(1);
  const [idPlayer, setIdPlayer] = useState("");

  const getIdPlayer = useCallback(() => {
    getJSON(`/admin/users?page=1&pageSize=20&address=${router.query.playerId}`)
    .then( res => setIdPlayer(`ID#${res.data[0].id}`))
    .catch(err => {throw err});
  }, [router.query.playerId])

  useEffect(()=>{
    if(pathName !== "player/[playerId]") return;
    getIdPlayer();
  }, [pathName, getIdPlayer])

  const renderPageTitle = (pathName) => {
    switch (pathName) {
      case "player/[playerId]":
        return (
          <div className="topbar__player-detail">
            <span>Player: </span>{" "}
            <span className="topbar__playerID"> {idPlayer}</span>
          </div>
        );

      case "settings":
        return "Game Details";

      case "notadmin":
        return "";

      default:
        return pageTitle;
    }
  };

  return (
    <div className="topbar">
      <div className="topbar__contain container--custom">
        <div className="topbar__title">{renderPageTitle(pathName)}</div>

        <CurrentAccountBadge />
      </div>
    </div>
  );
}

export default Topbar;
