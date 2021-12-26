import React, { useState } from "react";
import Header from "../components/Layouts/Header.js";
import Button from "../components/UI/Button.js";
import { wallets } from "../wallets.js";
import { useRouter } from "next/router";

function HomePage() {
  const [showWalletList, setShowWalletList] = useState(false);
  const router = useRouter();

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
      <div onClick={props.onClick} className="wallet-item">
        <div className="wallet-item__title">{props.name}</div>

        <div className="wallet-item__logo">
          <img src={props.imgSrc} alt={props.name} />
        </div>
      </div>
    );
  };

  const WalletList = () => {    
    return (
      <div className="wallet-list">
        <div className="wallet-list--heading">Connect Your Wallet</div>

        <div className="wallet-list--main">
          {wallets.map((w) => (
            <WalletItem onClick={() => router.push('/overview')} key={w.id} name={w.name} imgSrc={w.data} />
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
