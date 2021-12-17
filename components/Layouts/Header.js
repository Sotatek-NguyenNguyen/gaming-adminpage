import React from "react";
import gamifyLogo from "../../public/icons/gamify-text.svg";

const Header = () => {
  return (
    <nav className="header">
        <img className="header__logo" src={gamifyLogo.src} />
    </nav>
  );
};

export default Header;
