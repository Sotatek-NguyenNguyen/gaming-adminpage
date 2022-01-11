import { createContext, useState, useEffect } from "react";
import { getJSON } from "../common.js";
import { useAlert } from "../hooks/useAlert";

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

  useEffect(() => {
    getGameData().catch((err) => alertError(err.message));
    getPlayerList().catch(err => alertError(err.message));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        gameData,
        getPlayerBalanceByAddress,
        playerList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
