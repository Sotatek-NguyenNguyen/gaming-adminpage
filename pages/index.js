import React, { useState } from "react";
import Header from "../components/Layouts/Header.js";
import Button from "../components/UI/Button.js";

function HomePage() {
  const [showWalletList, setShowWalletList] = useState(false);

  const HeadingPrimary = () => {
    return (
      <div className="heading-primary">
        <h2 className="heading-primary--main">Connect Your Wallet</h2>
        <p className="heading-primary--sub">
          Connect your wallet to continue signing in
        </p>
        <Button
          onClick={() => setShowWalletList(true)}
          className="heading-primary--btn"
        >
          Select Wallet
        </Button>
      </div>
    );
  };

  const WalletItem = (props) => {
    return (
      <div className="wallet-item">
        <div className="wallet-item__title">{props.name}</div>

        <div className="wallet-item__logo">LOGO</div>
      </div>
    );
  };

  const WalletList = () => {
    const walltets = [
      { id: 0, name: "Phantom" },
      { id: 1, name: "Sollet" },
      { id: 2, name: "Sollet Extension" },
    ];

    return (
      <div className="wallet-list">
        <div className="wallet-list--heading">Connect a wallet</div>

        <div className="wallet-list--main">
          {walltets.map(w => (
            <WalletItem key={w.id} name={w.name} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {!showWalletList ? <HeadingPrimary /> : <WalletList />}
      </div>
    </React.Fragment>
  );
}

export default HomePage;
