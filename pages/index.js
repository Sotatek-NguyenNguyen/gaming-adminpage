import React from "react";
import Header from "../components/Layouts/Header.js";
import Button from "../components/UI/Button.js";

function HomePage() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="heading-primary">
          <h2 className="heading-primary--main">Connect Your Wallet</h2>
          <p className="heading-primary--sub">Connect your wallet to continue signing in</p>
          <Button className="heading-primary--btn">Select Wallet</Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
