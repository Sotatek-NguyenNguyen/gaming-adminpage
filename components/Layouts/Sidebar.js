import React from "react";
import Link from "next/link";
import gamifyLogo from "../../public/icons/gamify-text.svg";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from '@mui/icons-material/Category';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  
  return (
    <div className="sidebar">
      <img className="sidebar__logo" src={gamifyLogo.src} />

      {router.pathname !== "/notadmin" && (
        <div className="current-game">Game 1</div>
      )}

      {router.pathname !== "/notadmin" && (
        <ul className="menu-items">
          <Link href="/overview">
            <li
              className={`menu-item ${
                router.pathname === "/overview" ? "active" : ""
              }`}
            >
              <HomeIcon /> Overview
            </li>
          </Link>

          <Link href="/catalog">
            <li
              className={`menu-item ${
                router.pathname === "/catalog" ? "active" : ""
              }`}
            >
              <CategoryIcon /> Catalog
            </li>
          </Link>

          <Link href="/player">
            <li
              className={`menu-item ${
                router.pathname === "/player" ? "active" : ""
              }`}
            >
              <PeopleAltIcon /> Player
            </li>
          </Link>

          <Link href="/settings">
            <li
              className={`menu-item ${
                router.pathname === "/settings" ? "active" : ""
              }`}
            >
              <SettingsIcon /> Settings
            </li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
