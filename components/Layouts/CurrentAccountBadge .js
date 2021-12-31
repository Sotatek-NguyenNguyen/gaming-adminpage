import React, { useMemo } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks";

function CurrentAccountBadge({children}) {
  const router = useRouter();
  const {logout} = useAuth();
  const { publicKey, wallet, disconnect } = useWallet();
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (children) return children;
    if (!wallet || !base58) return null;
    return base58.slice(0, 4) + ".." + base58.slice(-4);
  }, [children, wallet, base58]);

  const handleDisconnectWallet = async () => {
    await logout();
    disconnect();
    router.replace('/')
  };

  return (
    <div className="account-badge">
      <CancelIcon onClick={handleDisconnectWallet} />
      <div className="account-badge__title">
        xxxxx Token <span className="token-id">{content}</span>
      </div>
    </div>
  );
}

export default CurrentAccountBadge;
