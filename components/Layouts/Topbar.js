import { useRouter } from "next/router";
import React from "react";
import CurrentAccountBadge from "./CurrentAccountBadge ";
import { Button } from '@mui/material';

function Topbar() {
  const router = useRouter();
  const pathName = router.pathname.replace("/", "");
  const pageTitle = pathName[0].toUpperCase() + pathName.slice(1);

  return (
    <div className="topbar container--custom">
      <div className="topbar__title">
        { pageTitle === 'Settings' ? 'Game Details' : pageTitle }
      </div>
      {
        pageTitle === 'Player' 
        ? 
          <div className='players'>
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
