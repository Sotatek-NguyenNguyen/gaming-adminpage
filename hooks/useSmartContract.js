import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useAlert } from "./useAlert";
import { useAuth } from "./useAuth";
import { useGlobal } from ".";
import { transformLamportsToSOL } from "../shared/helper";\
import { Token, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';

export function useSmartContract() {
  const { setAccountBalance } = useAuth();
  const { alertError } = useAlert();
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { gameData } = useGlobal();

  const handleOnchainError = (err) => {
    console.log({ err });
    if (err) {
      if (typeof err === "string") {
        alertError(err);
      } else if (
        err &&
        (err.code === "4001" ||
          err.message === "Transaction cancelled" ||
          err.name === WalletSignTransactionError.name)
      ) {
        alertError("User rejected the request.");
      } else if (err && err.message) {
        alertError(err.message);
      } else {
        alertError("Something went wrong. Please try again later.");
      }
    } else {
      alertError("Something went wrong. Please try again later.");
    }
  };

  const refreshWalletBalance = async () => {
    if (!publicKey) {
      throw new WalletNotConnectedError();
    }

    try {
      const tokenAccount = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        new PublicKey(gameData.tokenAddress),
        publicKey
      );
      const tokenAccountBalance = await connection.getTokenAccountBalance(
        tokenAccount
      );

      if (tokenAccountBalance && tokenAccountBalance.value) {
        const balanceResult = renderTokenBalance(
          tokenAccountBalance.value.uiAmount,
          2
        );
        setAccountBalance(balanceResult);

        return balanceResult;
      } else {
        return Promise.reject({ message: "Account not found" });
      }
    } catch (err) {
      return Promise.reject({ err });
    }
  };

  return { handleOnchainError, refreshWalletBalance };
}
