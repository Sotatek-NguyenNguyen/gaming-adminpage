import React, { useMemo, useState, useCallback, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useAlert, useAuth } from "../../hooks";

function CurrentAccountBadge({ children }) {
  const [copied, setCopied] = useState(false);
  const { alertInfo } = useAlert();
  const router = useRouter();
  const { logout, balance } = useAuth();
  const { publicKey, wallet, disconnect } = useWallet();
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

  return (
    <div className="account-badge">
      <CancelIcon onClick={handleDisconnectWallet} />
      <p className="account-badge__amount-token">{balance?.formatted} SOL</p>
      <p className="account-badge__token-id" onClick={copyAddress}>
        {content}
      </p>
    </div>
  );
}

export default CurrentAccountBadge;
