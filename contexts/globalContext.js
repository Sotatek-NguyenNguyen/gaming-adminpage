import { createContext, useState, useEffect } from "react";
import { getJSON } from "../common.js";
import { useAlert } from "../hooks/useAlert";
import { formatNumber } from "../shared/helper.js";

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
  getPlayerBalanceByAddress: address => {},
  balance: {
    value: 0,
    formatted: "0",
  },
  setAccountBalance: (accBalance) => {},
};

const GlobalContext = createContext(defaultState);

export const GlobalProvider = ({ children }) => {
  const { alertError } = useAlert();
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
  const [playerList, setPlayerList] = useState([]);

  const [balance, setBalance] = useState({
    value: 0,
    formatted: "0",
  });

  const getGameData = async () => {
    try {
      const gameInfo = await getJSON(`/admin/game-info`);
      setGameData(gameInfo);
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

  const getPlayerBalanceByAddress = address => {
    const player = playerList.find(player => player.address === address);
    return player.balance;
  };

  const setAccountBalance = (accBalance) => {
    // const balanceResult = transformLamportsToSOL(accBalance || 0);

    setBalance({
      value: accBalance,
      formatted: formatNumber.format(accBalance),
    });
  };

  useEffect(() => {
    getGameData().catch((err) => alertError(err.message));
    getPlayerList().catch(err => alertError(err.message));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        gameData,
        getPlayerBalanceByAddress,
        balance,
        setAccountBalance,
        playerList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
