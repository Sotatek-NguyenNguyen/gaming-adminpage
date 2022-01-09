import { createContext, useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useLocalStorageState, useConnection, useAlert } from "../hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import { signatureMsgAuth, loginAuth } from "../api/auth";
import { transformLamportsToSOL, formatNumber } from "../shared/helper";

const defaultState = {
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  isLoggined: () => {},
  balance: {
    value: 0,
    formatted: "0",
  },
  setAccountBalance: () => {},
};

const AuthContext = createContext(defaultState);

export const AuthProvider = ({ children }) => {
  const { wallet, publicKey: walletPublicKey } = useWallet();
  const [publicKey, setPublicKey] = useLocalStorageState("public_key");
  const [accessToken, setAccessToken] = useLocalStorageState("access_token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {alertError} = useAlert();
  const [balance, setBalance] = useState({
    value: 0,
    formatted: "0",
  });

  const { connection } = useConnection();

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

  useEffect(() => {
    if (publicKey) {
      connection
        .getAccountInfo(new PublicKey(publicKey))
        .then((response) => {
          const balanceResult = transformLamportsToSOL(response?.lamports);
          setBalance({
            value: balanceResult,
            formatted: formatNumber.format(balanceResult),
          });
        })
        .catch((err) => console.error(err));
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

        return token
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

  const setAccountBalance = (accBalance) => {
    const balanceResult = transformLamportsToSOL(accBalance || 0);

    setBalance({
      value: balanceResult,
      formatted: formatNumber.format(balanceResult),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        balance,
        setAccountBalance,
        isLoggined,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
