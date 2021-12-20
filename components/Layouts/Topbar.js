import { useRouter } from "next/router";
import React from "react";
import CurrentAccountBadge from "./CurrentAccountBadge ";

function Topbar() {
  const router = useRouter();
  const pathName = router.pathname.replace("/", "");
  const pageTitle = pathName[0].toUpperCase() + pathName.slice(1);

  return (
    <div className="topbar">
      <div className="topbar__title">
        {pathName !== "notadmin" ? pageTitle : ""}
      </div>
      <CurrentAccountBadge />
    </div>
  );
}

export default Topbar;
