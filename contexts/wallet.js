import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  getPhantomWallet,
  getSolletExtensionWallet,
} from "@solana/wallet-adapter-wallets";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { envConfig } from "../configs";
import { getSolletWallet } from "../wallets-adapters/custom-providers";

export const WalletConnectionProvider = ({ children }) => {
  const router = useRouter();

  const network = useMemo(() => {
    switch (envConfig.SOLLET_ENV) {
      case "devnet":
        return WalletAdapterNetwork.Devnet;
      case "testnet":
        return WalletAdapterNetwork.Testnet;
      case "mainnet-beta":
        return WalletAdapterNetwork.Mainnet;
      default:
        return WalletAdapterNetwork.Devnet;
    }
  }, []);

  const endpoint = useMemo(() => envConfig.API_URL_SMART_CONTRACT, []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        onError={(e) => {
          if (e.name === "WalletDisconnectedError") {
            router.replace('/')
          }
        }}
        autoConnect
      >
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
