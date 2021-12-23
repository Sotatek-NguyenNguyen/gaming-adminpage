import { useRouter } from "next/router";
import React from "react";
import CurrentAccountBadge from "./CurrentAccountBadge ";
import { Button } from '@mui/material';

function Topbar() {
  const router = useRouter();
  const pathName = router.pathname.replace("/", "");
  const pageTitle = pathName[0].toUpperCase() + pathName.slice(1);

  const renderPageTitle = (pathName) => {
    switch(pathName) {
      case 'player/[playerId]':
        return 'Player';

      case 'settings':
        return 'Game Details';

      case 'notadmin':
        return '';
        
      default:
        return pageTitle;
    }
  }

  return (
    <div className="topbar container--custom">
      <div className="topbar__title">
        { renderPageTitle(pathName) }
      </div>
      {
        pathName === 'player' 
        ? <div className='players'>
            <p className='players__total'>Total players: 0</p> 
            <Button variant="contained" className='btn-main'>Export Player</Button>
          </div>
        : ''
      }

      <CurrentAccountBadge />
    </div>
  );
}

export default Topbar;
