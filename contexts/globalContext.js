import { createContext, useState, useEffect } from "react";
import { getJSON } from "../common.js";
import { useAlert } from "../hooks/useAlert";
import { formatNumber } from "../shared/helper.js";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSmartContract } from "../hooks/useSmartContract.js";

const defaultState = {
  gameData: {
    name: "",
    videoIntroURL: "",
    logoURL: "",
    backgroundURL: "",
    description: "",
    gameURL: "",
    tokenCode: "",
    tokenName: "",
    walletAddress: "",
    programId: "",
    gameId: "",
    tokenAddress: "",
    tokenDecimals: 6,
  },
  playerList: [],
  getGameData: async () => {},
  getPlayerBalanceByAddress: (address) => {},
  balance: {
    value: 0,
    formatted: "0",
  },
  setAccountBalance: (accBalance) => {},
};

const GlobalContext = createContext(defaultState);

export const GlobalProvider = ({ children }) => {
  const { alertError } = useAlert();
  const { connected } = useWallet();
  const router = useRouter();
  const { refreshWalletBalance } = useSmartContract();
  const [gameData, setGameData] = useState({
    name: "",
    videoIntroURL: "",
    logoURL: "",
    backgroundURL: "",
    description: "",
    gameURL: "",
    tokenCode: "",
    tokenName: "",
    walletAddress: "",
    programId: "",
    gameId: "",
    tokenAddress: "",
    tokenDecimals: 6,
  });
  const { isAuthenticated, isLoggined } = useAuth();
  const [playerList, setPlayerList] = useState([]);

  const [balance, setBalance] = useState({
    value: 0,
    formatted: "0",
  });

  const getGameData = async () => {
    try {
      const gameInfo = await getJSON(`/admin/game-info`);
      setGameData(gameInfo);
      return gameInfo
    } catch (error) {
      throw error;
    }
  };

  const getPlayerList = async () => {
    try {
      const playersData = await getJSON(`/admin/users?page=1&pageSize=20`);
      setPlayerList(playersData.data);
    } catch (error) {
      throw error;
    }
  };

  const getPlayerBalanceByAddress = async (address) => {
    try {
      const res = await getJSON(
        `/admin/users?page=1&pageSize=20&address=${address}`
      );
      const playerBalance = res?.data[0].balance;

      return playerBalance / Math.pow(10, gameData?.tokenDecimals);
    } catch (error) {
      console.error(error);
    }
  };

  const setAccountBalance = (accBalance) => {
    // const balanceResult = transformLamportsToSOL(accBalance || 0);

    setBalance({
      value: accBalance,
      formatted: formatNumber.format(accBalance),
    });
  };

  useEffect(() => {
    if (router.pathname === "/") return;

    getGameData().catch((err) => alertError(err.message));
    getPlayerList().catch((err) => alertError(err.message));

  }, [router]);

  return (
    <GlobalContext.Provider
      value={{
        gameData,
        getGameData,
        getPlayerBalanceByAddress,
        balance,
        setAccountBalance,
        playerList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
