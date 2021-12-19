import React from "react";
import Link from "next/link";
import gamifyLogo from "../../public/icons/gamify-text.svg";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="sidebar">
      <img className="sidebar__logo" src={gamifyLogo.src} />
      <div className="current-game">Game 1</div>

      <div className="hori-selector">
        <div className="left"></div>
        <div className="right"></div>
      </div>

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
            <EmojiEventsIcon /> Catalog
          </li>
        </Link>

        <Link href="/player">
          <li
            className={`menu-item ${
              router.pathname === "/player" ? "active" : ""
            }`}
          >
            <GroupsIcon /> Player
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
    </div>
  );
};

export default Sidebar;
