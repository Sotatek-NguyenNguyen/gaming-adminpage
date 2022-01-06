import { envConfig, solletConfig } from "../configs";
import {LAMPORTS_PER_SOL} from "@solana/web3.js";

const { SOLLET_ENV2 } = envConfig;
const { SOLLET_CHAINS } = solletConfig;

export const getCurrentChain = () => {
  let matched;
  const defaultChain = SOLLET_CHAINS.find((slc) => slc.name === "testnet");

  if (SOLLET_ENV2 && SOLLET_ENV2) {
    matched = SOLLET_CHAINS.find((slc) => slc.name === SOLLET_ENV2) || null;
  } else {
    matched = null;
  }

  if (matched) {
    return matched;
  }

  return defaultChain;
};

export const transformLamportsToSOL = (lamports) => {
  return lamports / LAMPORTS_PER_SOL;
};

const isSmallNumber = (val) => {
  return val < 0.001 && val > 0;
};

export const formatNumber = {
  format: (val, useSmall) => {
    if (!val && val !== 0) {
      return '--';
    }
    if (useSmall && isSmallNumber(val)) {
      return 0.001;
    }

    return numberFormatter.format(val);
  },
};