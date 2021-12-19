import React from "react";
import gamifyLogo from "../../public/icons/gamify-text.svg";
import Link from 'next/link';

const Header = () => {
  return (
    <nav className="header">
       <Link href="/">
          <img className="header__logo" src={gamifyLogo.src} />
       </Link>
    </nav>
  );
};

export default Header;
