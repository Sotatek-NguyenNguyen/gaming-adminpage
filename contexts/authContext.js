import { createContext, useEffect, useState } from "react";
import { PublicKey, Cluster } from "@solana/web3.js";
import {
  useLocalStorageState,
  useConnection,
  useAlert,
  useGlobal,
} from "../hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import { signatureMsgAuth, loginAuth } from "../api/auth";
import { transformLamportsToSOL, formatNumber, renderTokenBalance } from "../shared/helper";
import { envConfig } from "../configs";
import * as spl from "@solana/spl-token";
import {
  Token,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const { SOLLET_ENV } = envConfig;

const defaultState = {
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  isLoggined: () => {},
  cluster: SOLLET_ENV,
  balance: {
    value: 0,
    formatted: "0",
  },
  changeCluster: () => {},
};

const AuthContext = createContext(defaultState);

export const AuthProvider = ({ children }) => {
  const { wallet, publicKey: walletPublicKey } = useWallet();
  const [publicKey, setPublicKey] = useLocalStorageState("public_key");
  const [accessToken, setAccessToken] = useLocalStorageState("access_token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { gameData } = useGlobal();
  const [cluster, setCluster] = useState(SOLLET_ENV);
  const { alertError } = useAlert();
  const [balance, setBalance] = useState({
    value: 0,
    formatted: "0",
  });

  const { connection } = useConnection();

  const changeCluster = (newCluster) => {
    setCluster(newCluster);
  };

  useEffect(() => {
    const getAuthenStatus = () => {
      if (!walletPublicKey || !publicKey || !accessToken) {
        return false;
      }

      if (walletPublicKey?.toString() !== publicKey) {
        return false;
      }

      return true;
    };
    setIsAuthenticated(getAuthenStatus());
  }, [wallet, walletPublicKey]);

  const getAccountTokenInfo = async () => {
    if (gameData?.tokenAddress && publicKey) {
      try {
        const tokenAccount = await spl.Token.getAssociatedTokenAddress(
          spl.ASSOCIATED_TOKEN_PROGRAM_ID,
          spl.TOKEN_PROGRAM_ID,
          new PublicKey(gameData.tokenAddress),
          new PublicKey(publicKey)
        );
        const tokenAccountBalance = await connection.getTokenAccountBalance(
          tokenAccount
        );
        if (tokenAccountBalance && tokenAccountBalance.value) {
          const balanceResult = renderTokenBalance(
            tokenAccountBalance.value.uiAmount,
            2
          );

          setBalance({
            value: balanceResult,
            formatted: formatNumber.format(balanceResult),
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (publicKey) {
      getAccountTokenInfo();
    }
  }, [publicKey]);

  const login = async (walletAddress, signMessage, adapter) => {
    try {
      let token;
      if (signMessage) {
        const signatureMsg = await signatureMsgAuth({
          address: walletAddress.toString(),
        });
        const encodedMessage = new TextEncoder().encode(
          signatureMsg?.signatureMsg
        );
        const signature = await signMessage(encodedMessage);
        const tokenResponse = await loginAuth({
          address: walletAddress.toString(),
          signature: Buffer.from(signature),
        });
        token = tokenResponse.accessToken;
      } else {
        const signatureMsg = await signatureMsgAuth({
          address: walletAddress.toString(),
        });
        const encodedMessage = new TextEncoder().encode(
          signatureMsg?.signatureMsg
        );
        const { signature } = await adapter._wallet.sign(
          Buffer.from(encodedMessage),
          "object"
        );
        const tokenResponse = await loginAuth({
          address: walletAddress.toString(),
          signature: Buffer.from(signature),
        });
        token = tokenResponse.accessToken;
      }

      if (token) {
        setIsAuthenticated(true);
        setPublicKey(walletAddress.toString());
        setAccessToken(token);

        return token;
      }
    } catch (e) {
      setIsAuthenticated(false);
      setPublicKey(null);
      alertError("Can not login, please try again");
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setPublicKey(null);
    setAccessToken(null);
  };

  const isLoggined = () => {
    const loginStatus = accessToken && publicKey ? true : false;
    return loginStatus;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        balance,
        isLoggined,
        cluster,
        changeCluster,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
