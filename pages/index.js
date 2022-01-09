import React, { useState, useMemo } from "react";
import Header from "../components/Layouts/Header.js";
import Button from "../components/UI/Button.js";
import { useRouter } from "next/router";
import { useWallet } from '@solana/wallet-adapter-react';
import { useAlert } from "../hooks";
import {
  useWalletModal,
} from '@solana/wallet-adapter-react-ui';
import { useAuth } from '../hooks';

function HomePage() {
  const router = useRouter();
  const { login } = useAuth();
  const { connected, wallet, publicKey, signMessage, adapter, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const [loading, setLoading] = useState(false);
  const {alertError} = useAlert();

  const buttonText = useMemo(() => {
    if (connecting) return 'Connecting ...';
    if (connected) return 'Connected';
    if (wallet) return 'Connect';
    return 'Select Wallet';
  }, [connecting, connected, wallet]);

  const handleLogin = async () => {
    if (connected) {
      setLoading(true);
      try {
        const token = await login(publicKey, signMessage, adapter);
        if (token) router.replace('/overview');
        else router.replace('/notadmin');
      } catch (error) {
        setLoading(false);
      }
    } else {
      alertError('Wallet is not connected');
    }
  }

  const HeadingPrimary = () => {
    return (
      <div className="heading-primary">
        <h2 className="heading-primary--main">Connect Your Wallet</h2>
        <p className="heading-primary--sub">
          Connect your wallet to continue signing in
        </p>
        <Button
          onClick={() => setVisible(true)}
          className="heading-primary--btn"
        >
          {buttonText}
        </Button>
      </div>
    );
  };

  const HeadingConnectedWallet = () => {
    return (
      <div className="heading-primary">
        <h2 className="heading-primary--main">Your Wallet is connected</h2>
        <p className="heading-primary--sub">Your current address</p>
        <p className="signin__address">{publicKey?.toString()}</p>
        <Button
          onClick={handleLogin}
          className="heading-primary--btn"
        >
          {loading ? 'Connecting...' : 'SIGN IN WITH ADDRESS'}
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

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {!connected ? <HeadingPrimary /> : <HeadingConnectedWallet />}
      </div>
    </React.Fragment>
  );
}

export default HomePage;
