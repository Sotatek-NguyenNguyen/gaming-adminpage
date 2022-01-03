import { useRouter } from "next/router";
import React from "react";
import CurrentAccountBadge from "./CurrentAccountBadge ";

function Topbar() {
  const router = useRouter();
  const pathName = router.pathname.replace("/", "");
  const pageTitle = pathName[0].toUpperCase() + pathName.slice(1);

  const renderPageTitle = (pathName) => {
    switch(pathName) {
      case 'player/[playerId]':
        return (
          <React.Fragment>
            Player: <span>ID#{router.query.playerId}</span>
          </React.Fragment>
        );

      case 'settings':
        return 'Game Details';

      case 'notadmin':
        return '';
        
      default:
        return pageTitle;
    }
  }

  return (
    <div className="topbar">
      <div className="topbar__contain container--custom">
        <div className="topbar__title">
          { renderPageTitle(pathName) }
        </div>

        <CurrentAccountBadge />
      </div>
    </div>
  );
}

export default Topbar;
