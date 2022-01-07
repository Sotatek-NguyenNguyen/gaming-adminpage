import { createContext, useState, useEffect } from "react";

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

  return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
};

export default GlobalContext;
