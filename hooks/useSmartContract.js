import { WalletSignTransactionError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useAlert } from './useAlert';
import { useAuth } from './useAuth';
import { transformLamportsToSOL } from '../shared/helper';

export function useSmartContract() {
  const { setAccountBalance } = useAuth();
  const { alertError } = useAlert();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const handleOnchainError = (err) => {
    console.log({ err });
    if (err) {
      if (typeof err === 'string') {
        alertError(err);
      } else if (
        err &&
        (err.code === '4001' ||
          err.message === 'Transaction cancelled' ||
          err.name === WalletSignTransactionError.name)
      ) {
        alertError('User rejected the request.');
      } else if (err && err.message) {
        alertError(err.message);
      } else {
        alertError('Something went wrong. Please try again later.');
      }
    } else {
      alertError('Something went wrong. Please try again later.');
    }
  };

  const refreshWalletBalance = async () => {
    if (!publicKey) {
      throw new WalletNotConnectedError();
    }

    try {
      const accInfo = await connection.getAccountInfo(publicKey);
      if (accInfo && accInfo.lamports) {
        const balanceResult = transformLamportsToSOL(accInfo.lamports || 0);

        setAccountBalance(accInfo.lamports);

        return balanceResult;
      } else {
        return Promise.reject({ message: 'Account not found' });
      }
    } catch (err) {
      return Promise.reject({ err });
    }
  };

  return { handleOnchainError, refreshWalletBalance };
}
