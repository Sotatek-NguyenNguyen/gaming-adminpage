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

  const getGameData = async () => {
    try {
      const gameInfo = await getJSON(`/admin/game-info`);
      setGameData(gameInfo);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getGameData().catch((err) => alertError(err.message));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        gameData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
