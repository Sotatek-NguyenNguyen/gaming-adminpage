import { envConfig, solletConfig } from "../configs";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Decimal from "decimal.js";

const { SOLLET_ENV2 } = envConfig;
const { SOLLET_CHAINS } = solletConfig;

export const getCurrentChain = () => {
  let matched;
  const defaultChain = SOLLET_CHAINS.find((slc) => slc.name === "devnet");

  if (SOLLET_ENV2) {
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

const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatNumber = {
  format: (val, useSmall) => {
    if (!val && val !== 0) {
      return "--";
    }
    if (useSmall && isSmallNumber(val)) {
      return 0.001;
    }

    return numberFormatter.format(val);
  },
};

export const isValidURL = (url) => {
  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }

  return true;
};

export const renderTokenBalance = (balance, tokenDecimals) => {
  if (balance === null || balance === undefined) {
    return 0;
  }

  if (typeof balance === "string") {
    return parseFloat(parseFloat(balance).toFixed(tokenDecimals));
  }

  return new Decimal(
    parseFloat(balance.toString()).toFixed(tokenDecimals)
  ).toNumber();
};

export const removePrefix = (transactionType) =>
  transactionType.split("_")[1] + "ed";

export const checkSameDay = (day1, day2) =>
  day1.setHours(0, 0, 0, 0) == day2.setHours(0, 0, 0, 0);

export const formatStatus = (status) => {
  switch(status) {
    case 'deposit':
      return 'Deposited'

    case 'admin_deduct':
    case 'deduct':
      return 'Deducted'

    case 'admin_grant':
    case 'grant':
      return 'Granted'
    
    case 'MetadataUploading':
    case 'Minting':
      return 'Active'

    default:
      return status
  }
}

export const validateURL = (link, isImg = false, callBack) => {
  let res = link.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm);
  if(isImg){
    let extendsImg = ['JPG', 'JPEG', 'PNG', 'jpg', 'jpeg', 'png'];
    let extendsURL = ['com', 'vn'];
    // split url and get last item
    let linkToArr = link.split('.');
    let extend = linkToArr[linkToArr.length - 1];

    if(
      !extendsImg.includes(extend) || 
       // check before last item(extend img) is .com or .vn
       extendsURL.includes(linkToArr[linkToArr.length - 2])
    ){
      callBack(link);
      return false;
    }
  }
  // callback run when func return false
  if(res === null){
    callBack(link);
  }
  return (res !== null);
}
