import { useRouter } from "next/router";
import React from "react";
import CurrentAccountBadge from "./CurrentAccountBadge .js";
import Sidebar from "./Sidebar.js";
import Topbar from "./Topbar.js";

function Layout(props) {
  let renderAccountBadge = () => {
    return (
      <div className="accountBadge_notAdmin container--custom">
        <CurrentAccountBadge />
      </div>
    );
  };
  const router = useRouter();
  return (
    <div className="main-layout">
      <Sidebar />

      <div className="container">
        {router.pathname !== "/notadmin" ? <Topbar /> : renderAccountBadge()}
        <main>{props.children}</main>
      </div>
    </div>
  );
}

export default Layout;
