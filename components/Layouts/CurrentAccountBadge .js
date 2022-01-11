import React, { useMemo, useState, useCallback, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useAlert, useAuth, useSmartContract, useGlobal } from "../../hooks";

function CurrentAccountBadge({ children }) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const { alertInfo } = useAlert();
  const { refreshWalletBalance } = useSmartContract();
  const router = useRouter();
  const { logout, balance, isAuthenticated, setAccountBalance } = useAuth();
  const {gameData} = useGlobal();
  const { publicKey, wallet, disconnect, connected } = useWallet();
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (children) return children;
    if (!wallet || !base58) return null;
    return base58.slice(0, 4) + "..." + base58.slice(-3);
  }, [children, wallet, base58]);

  const handleDisconnectWallet = async () => {
    await logout();
    disconnect();
    router.replace("/");
  };

  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58);
      setCopied(true);
      setTimeout(() => setCopied(false), 400);
    }
  }, [base58]);

  useEffect(() => {
    if (copied) {
      alertInfo("Copied");
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  useEffect(() => {
    const initBalance = async () => {
      try {
        setLoading(true);
        if (!isAuthenticated) {
          await login(publicKey, signMessage, adapter);
        }
        await refreshWalletBalance();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setAccountBalance(0);
      }
    };

    if (connected) {
      initBalance();
    } else {
      setAccountBalance(0);
    }
  }, [connected, isAuthenticated]);

  return (
    <div className="account-badge">
      <CancelIcon onClick={handleDisconnectWallet} />
      <p className="account-badge__amount-token">
        {loading ? (
          <span>Loading...</span> 
        ) : (
          <span>{balance?.formatted} {gameData?.tokenCode}</span>
        )}  
      </p>
      <p className="account-badge__token-id" onClick={copyAddress}>
        {content}
      </p>
    </div>
  );
}

export default CurrentAccountBadge;
