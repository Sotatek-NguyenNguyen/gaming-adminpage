import { createContext, useEffect, useState } from 'react';
import { useLocalStorageState } from '../hooks';
import { useWallet } from '@solana/wallet-adapter-react';
import { signatureMsgAuth, loginAuth } from "../api/auth"

const defaultState = {
  isAuthenticated: false,
  login: async () => { },
  logout: () => { },
}

const AuthContext = createContext(defaultState);

export const AuthProvider = ({ children }) => {
  const { wallet, publicKey: walletPublicKey } = useWallet();
  const [publicKey, setPublicKey] = useLocalStorageState('public_key');
  const [accessToken, setAccessToken] = useLocalStorageState('access_token');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const login = async (
    walletAddress,
    signMessage,
    adapter,
  ) => {
    try {
      let token;
      if (signMessage) {
        const signatureMsg = await signatureMsgAuth({ address: walletAddress.toString() });
        const encodedMessage = new TextEncoder().encode(signatureMsg?.signatureMsg);
        const signature = await signMessage(encodedMessage);
        const tokenResponse = await loginAuth({
          address: walletAddress.toString(),
          signature: Buffer.from(signature),
        });
        token = tokenResponse.accessToken;
      } else {
        const signatureMsg = await signatureMsgAuth({ address: walletAddress.toString() });
        const encodedMessage = new TextEncoder().encode(signatureMsg?.signatureMsg);
        const { signature } = await adapter._wallet.sign(Buffer.from(encodedMessage), 'object');
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
      }
    } catch (e) {
      setIsAuthenticated(false);
      setPublicKey(null);
      throw new Error('Can not login, please try again');
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setPublicKey(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;