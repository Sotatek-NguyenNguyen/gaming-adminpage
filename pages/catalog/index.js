import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Commitment,
  ConfirmOptions,
  Transaction,
} from "@solana/web3.js";
import { Program, Provider, BN, web3 } from "@project-serum/anchor";
import * as spl from "@solana/spl-token";
import { useRouter } from "next/router";
import Layout from "../../components/Layouts/Layout";
import Button from "../../components/UI/Button.js";
import SimpleAccordion from "../../components/UI/Accordion";
import Modal from "../../components/UI/Modal.js";

import Inventory from "../../components/catalogTransaction/inventory";
import TransactionsHistory from "../../components/catalogTransaction/transactionsHistory";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { sendJSON } from "../../common";
import { IDL } from "../../treasury.js";
import { useAlert, useAuth, useGlobal, useSmartContract, useGameBalance } from "../../hooks";
import InGameBalance from "../../components/Layouts/InGameBalance";

const treasuryPDASeed = Buffer.from("treasury");

function CatalogPage() {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showGrantTokenModal, setShowGrantTokenModal] = useState(false);
  const [showDeductTokenModal, setShowDeductTokenModal] = useState(false);
  const [errors, setErrors] = useState(null);
  const [tab, setTab] = useState("inventory");
  const [tokenData, setTokenData] = useState({});
  const { alertError, alertSuccess, alertWarning } = useAlert();
  const { publicKey, signTransaction } = useWallet();
  const { isLoggined, cluster } = useAuth();
  const { refreshWalletBalance } = useSmartContract();
  const { gameData } = useGlobal();
  const router = useRouter();

  const opts = {
    preflightCommitment: "processed",
    commitment: "processed",
  };

  const { SystemProgram } = web3;
  const wallet = window.solana;

  const network = clusterApiUrl(cluster);
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new Provider(connection, wallet, opts);

  const changeTab = (tab) => () => {
    setTab(tab);
  };

  const convertTokenAmountBaseOnTokenDec = useMemo(
    () => (amount) => {
      return amount * Math.pow(10, gameData?.tokenDecimals);
    },
    [gameData]
  );

  const handleCloseModal = () => {
    if (showGrantTokenModal || showDeductTokenModal) {
      alertWarning("User rejected the request");
    }
    setShowDepositModal(false);
    setShowWithdrawModal(false);
    setShowGrantTokenModal(false);
    setShowDeductTokenModal(false);

    setErrors(null);
  };

  const DepositModal = useCallback(() => {
    return (
      <Modal
        title="Confirm Deposit Token?"
        address={
          <>
            Destination Address <br />
            {gameData?.walletAddress}
          </>
        }
        onCloseModal={handleCloseModal}
        inputDisabled={false}
        onClick={handleDeposit}
      />
    );
  }, [gameData?.walletAddress, handleDeposit, signTransaction]);

  const WithDrawModal = useCallback(() => {
    return (
      <Modal
        title="Confirm Withdraw Token?"
        editableAddress={true}
        onCloseModal={handleCloseModal}
        inputDisabled={false}
        onClick={handleWithDraw}
      />
    );
  }, [handleWithDraw, signTransaction]);

  const GrantTokenModal = useCallback(() => {
    return (
      <Modal
        title="Confirm Sending Token?"
        onClick={sendingToken}
        tokenAmount={tokenData.amount}
        address={
          <>
            Destination Address <br />
            {tokenData?.userAddress}
          </>
        }
        onCloseModal={handleCloseModal}
        inputDisabled={true}
      />
    );
  }, [sendingToken, tokenData.amount, tokenData?.userAddress]);

  const DeductTokenModal = useCallback(() => {
    return (
      <Modal
        title="Confirm Deduct Token?"
        onClick={deductToken}
        tokenAmount={tokenData.amount}
        address={
          <>
            Originate Wallet Address <br />
            {tokenData?.userAddress}
          </>
        }
        onCloseModal={handleCloseModal}
        inputDisabled={true}
      />
    );
  }, [deductToken, tokenData.amount, tokenData?.userAddress]);

  const handleWithDraw = async (userAddress, amount) => {
    if (!signTransaction) return;
    try {
      const exactAmount = convertTokenAmountBaseOnTokenDec(amount);

      const serverTx = await sendJSON(`/admin/game-balance/withdrawals`, {
        userAddress,
        amount: exactAmount,
      });
      const userTx = Transaction.from(
        Buffer.from(serverTx.serializedTx, "base64")
      );
      const signed = await signTransaction(userTx);
      const signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(signature);
      await refreshWalletBalance();
      alertSuccess("Withdrawn successfully");
      setErrors(null);
      setShowWithdrawModal(false);
    } catch (error) {
      console.error(error.message);
      setShowWithdrawModal(false);
      alertError("Transaction Canceled");
    }
  };

  const handleDeposit = async (depositValue) => {
    const wallet = window.solana;

    if (
      publicKey &&
      gameData.gameId &&
      gameData.programId &&
      gameData.tokenAddress
    ) {
      const gameId = new PublicKey(gameData.gameId);

      try {
        const program = new Program(
          IDL,
          new PublicKey(gameData.programId),
          provider
        );

        // token for deposit and withdraw
        const token = new spl.Token(
          provider.connection,
          new PublicKey(gameData.tokenAddress),
          spl.TOKEN_PROGRAM_ID,
          wallet.payer
        );

        /* const fromTokenAccount = await token.getOrCreateAssociatedAccountInfo(
          wallet.publicKey
        ); */

        const tokenAccountAddress = await spl.Token.getAssociatedTokenAddress(
          spl.ASSOCIATED_TOKEN_PROGRAM_ID,
          spl.TOKEN_PROGRAM_ID,
          new PublicKey(gameData.tokenAddress),
          wallet.publicKey
        );

        const [treasuryAccount] = await PublicKey.findProgramAddress(
          [treasuryPDASeed, gameId.toBuffer()],
          program.programId
        );

        const [treasuryTokenAccount] = await PublicKey.findProgramAddress(
          [treasuryPDASeed, gameId.toBuffer(), token.publicKey.toBuffer()],
          program.programId
        );

        const signature = await program.rpc.deposit(
          gameId,
          new BN(depositValue * Math.pow(10, gameData.tokenDecimals)),
          {
            accounts: {
              sender: program.provider.wallet.publicKey,
              depositUser: program.provider.wallet.publicKey,
              senderTokenAccount: tokenAccountAddress,
              treasuryAccount,
              treasuryTokenAccount,
              tokenProgram: spl.TOKEN_PROGRAM_ID,
              systemProgram: SystemProgram.programId,
            },
          }
        );
        await refreshWalletBalance();
        alertSuccess("Deposited successfully");
      } catch (error) {
        console.error(error);
        setShowDepositModal(false);
        alertError("Transaction Canceled");
      }
      setShowDepositModal(false);
    }
  };

  const grantTokenHandler = (amount, userAddress, note) => {
    setShowGrantTokenModal(true);
    setTokenData({ amount, userAddress, note });
  };

  const deductTokenHandler = (amount, userAddress, note) => {
    setShowDeductTokenModal(true);
    setTokenData({ amount, userAddress, note });
  };

  const sendingToken = () => {
    const exactTokenData = {
      ...tokenData,
      amount: convertTokenAmountBaseOnTokenDec(tokenData.amount),
    };

    sendJSON(`/admin/users/grant-token`, exactTokenData)
      .then((res) => {
        if (res.success) {
          const _errors = { ...errors };
          _errors["grant"] = null;
          setErrors(_errors);
          alertSuccess("Successfully granted token!");
        }
        if (res.statusCode === 404) alertError("User not found!");
      })
      .finally(() => {
        setTokenData({});
        setShowGrantTokenModal(false);
      })
      .catch((err) => console.error(err.message));
  };

  const deductToken = () => {
    const exactTokenData = {
      ...tokenData,
      amount: convertTokenAmountBaseOnTokenDec(tokenData.amount),
    };

    sendJSON(`/admin/users/deduct-token`, exactTokenData)
      .then((res) => {
        if (res.success)
          alertSuccess(
            "Successfully deducted token from originate wallet address"
          );
        if (res.statusCode === 404) alertError("User not found!");
      })
      .finally(() => {
        setTokenData({});
        setShowDeductTokenModal(false);
      })
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    const loginStatus = isLoggined();
    if (!loginStatus) router.replace("/");
  }, []);

  return (
    <div className="catalog">
      {showDepositModal && <DepositModal />}
      {showWithdrawModal && <WithDrawModal />}
      {showGrantTokenModal && <GrantTokenModal />}
      {showDeductTokenModal && <DeductTokenModal />}

      <div className="card-custom container--custom">
        <h5 className="card__title">Game Balance</h5>

        <div className="card__body">
          <form className="form-content" onSubmit={(e) => e.preventDefault()}>
            <InGameBalance />

            <div className="form-actions">
              <Button
                className="btn-main--outline"
                onClick={() => setShowWithdrawModal(true)}
              >
                Withdraw
              </Button>
              <Button
                className="btn-main"
                onClick={() => setShowDepositModal(true)}
              >
                Deposit
              </Button>
            </div>
          </form>
        </div>
      </div>

      <SimpleAccordion
        onGrantToKenSubmit={grantTokenHandler}
        onDeductTokenSubmit={deductTokenHandler}
      />

      <section className="player__info container--custom">
        <div className="info__tabs">
          <p
            onClick={changeTab("inventory")}
            style={{
              fontWeight: tab === "inventory" ? 600 : 400,
              color: tab === "inventory" ? "#6823BF" : "#9F99B3",
            }}
          >
            Inventory
          </p>
          <p
            onClick={changeTab("transactionHistory")}
            style={{
              fontWeight: tab === "transactionHistory" ? 600 : 400,
              color: tab === "transactionHistory" ? "#6823BF" : "#9F99B3",
            }}
          >
            Transaction History
          </p>
        </div>
        <div>
          {tab === "inventory" ? (
            <Inventory />
          ) : (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TransactionsHistory />
            </LocalizationProvider>
          )}
        </div>
      </section>
    </div>
  );
}

export default CatalogPage;

CatalogPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
