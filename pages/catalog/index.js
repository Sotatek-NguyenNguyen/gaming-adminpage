import React, { useState, useEffect } from "react";
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
import Input from "../../components/UI/Input.js";
import Tooltip from "../../components/UI/Tooltip";
import Button from "../../components/UI/Button.js";
import SimpleAccordion from "../../components/UI/Accordion";
import Modal from "../../components/UI/Modal.js";

import Inventory from "../../components/catalogTransaction/inventory";
import TransactionsHistory from "../../components/catalogTransaction/transactionsHistory";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { getJSON, sendJSON } from "../../common";
import { IDL } from "../../treasury.js";
import { useAlert, useAuth, useGlobal } from "../../hooks";

const treasuryPDASeed = Buffer.from("treasury");

function CatalogPage() {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showGrantTokenModal, setShowGrantTokenModal] = useState(false);
  const [showDeductTokenModal, setShowDeductTokenModal] = useState(false);
  const [tab, setTab] = useState("inventory");
  const [actualGameBalance, setActualGameBalance] = useState("");
  const [allocatedInGameBalance, setAllocatedInGameBalance] = useState("");
  const [unallocatedInGameBalance, setUnallocatedInGameBalance] = useState("");
  const [tokenData, setTokenData] = useState({});
  const { alertError, alertSuccess, alertWarning } = useAlert();
  const { publicKey, signTransaction } = useWallet();
  const { isLoggined, balance } = useAuth();
  const { gameData, getPlayerBalanceByAddress } = useGlobal();
  const router = useRouter();

  const opts = {
    preflightCommitment: "processed",
    commitment: "processed",
  };

  const { SystemProgram } = web3;
  const wallet = window.solana;

  const network = clusterApiUrl("devnet");
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new Provider(connection, wallet, opts);

  const changeTab = (tab) => () => {
    setTab(tab);
  };

  const handleCloseModal = () => {
    setShowDepositModal(false);
    setShowWithdrawModal(false);
    setShowGrantTokenModal(false);
    setShowDeductTokenModal(false);
  };

  const DepositModal = () => {
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
  };

  const WithDrawModal = () => {
    return (
      <Modal
        title="Confirm Withdraw Token?"
        editableAddress={true}
        onCloseModal={handleCloseModal}
        inputDisabled={false}
        onClick={handleWithDraw}
      />
    );
  };

  const GrantTokenModal = () => {
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
  };

  const DeductTokenModal = () => {
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
  };

  const validateWithDrawAmount = amount => {
    if (amount === 0 || amount < 0) {
      alertWarning("Please enter greater token!");
      return false;
    } else if (amount > unallocatedInGameBalance) {
      alertWarning("Please enter smaller token!")
      return false;
    } else return true; 
  };

  const handleWithDraw = async (userAddress, amount) => {
    if (userAddress === "")
      return alertWarning("Destination address cannot be empty!");
  
    const validatedAmount = validateWithDrawAmount(+amount);
    if (!validatedAmount) return;

    if (!signTransaction) return;

    try {
      const serverTx = await sendJSON(`/admin/game-balance/withdrawals`, {
        userAddress,
        amount,
      });
      const userTx = Transaction.from(
        Buffer.from(serverTx.serializedTx, "base64")
      );
      const signed = await signTransaction(userTx);
      const signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(signature);
      alertSuccess("Withdraw successfully");
      setShowWithdrawModal(false);
    } catch (error) {
      console.error(error.message);
      setShowWithdrawModal(false);
      alertError("Transaction Canceled");
    }
  };

  const validateDepositAmount = amount => {
    if (amount < 0 || amount === 0) {
      alertWarning("Please enter greater token!");
      return false;
    } else if (amount > balance) {
      alertWarning("Please enter smaller token!")
      return false; 
    } else return true;
  };

  const handleDeposit = async (depositValue) => {
    const validatedAmount = validateDepositAmount(+depositValue);
    if (!validatedAmount) return;

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
        alertSuccess("Deposited successfully");
      } catch (error) {
        console.error(error);
        setShowDepositModal(false);
        alertError("Transaction Canceled");
      }
      setShowDepositModal(false);
    }
  };

  const validateGrantTokenAmount = (amount) => {
    if (amount === 0 || amount < 0) {
      alertWarning("Please enter greater token!");
      return false;
    } else if (amount > unallocatedInGameBalance) {
      alertWarning("Please enter smaller token!");
      return false;
    } else return true;
  };

  const validateDeductTokenAmount = (amount, address) => {
    const playerBalance = getPlayerBalanceByAddress(address);
    if (amount < 0 || amount === 0) {
      alertWarning("Please enter greater token!");
      return false;
    } else if (amount > playerBalance) {
      alertWarning("Please enter smaller token!");
      return false;
    } else return true;
  };

  const grantTokenHandler = (amount, userAddress, note) => {
    const validatedAmount = validateGrantTokenAmount(+amount);
    if (!validatedAmount) return;

    setShowGrantTokenModal(true);
    setTokenData({ amount, userAddress, note });
  };

  const deductTokenHandler = (amount, userAddress, note) => {
    const validatedAmount = validateDeductTokenAmount(+amount, userAddress);
    if (!validatedAmount) return;

    setShowDeductTokenModal(true);
    setTokenData({ amount, userAddress, note });
  };

  const sendingToken = () => {
    sendJSON(`/admin/users/grant-token`, tokenData)
      .then((res) => {
        if (res.success) alertSuccess("Successfully granted token!");
        if (res.statusCode === 404) alertError("User not found!");
      })
      .finally(() => {
        getGameBalance();
        setTokenData({});
        setShowGrantTokenModal(false);
      })
      .catch((err) => console.error(err.message));
  };

  const deductToken = () => {
    sendJSON(`/admin/users/deduct-token`, tokenData)
      .then((res) => {
        if (res.success) alertSuccess("Deduct token successfully!");
        if (res.statusCode === 404) alertError("User not found!");
      })
      .finally(() => {
        getGameBalance();
        setTokenData({});
        setShowDeductTokenModal(false);
      })
      .catch((err) => console.error(err.message));
  };

  const getGameBalance = async () => {
    try {
      const res = await getJSON(`/admin/game-balance`);
      setActualGameBalance(res?.actualGameBalance);
      setUnallocatedInGameBalance(res?.unallocatedInGameBalance);
      setAllocatedInGameBalance(res?.allocatedInGameBalance);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const loginStatus = isLoggined();
    if (!loginStatus) router.replace("/");
  }, []);

  useEffect(() => {
    getGameBalance().catch((err) => console.error(err.message));
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
            <div>
              <label htmlFor="actual-game" className="game-label">
                <h5>Actual game balance</h5>
                <Tooltip info="Actual amount of Token in Smart Contract" />
              </label>
              <Input
                disabled
                type="number"
                id="actual-game"
                className="input-main large disable"
                value={actualGameBalance}
              />
            </div>

            <div>
              <label htmlFor="unallocated" className="game-label">
                <h5>Unallocated in-game balance</h5>
                <Tooltip info="Balance deposited by Admin and has not been granted to any players" />
              </label>
              <Input
                disabled
                type="number"
                id="unallocated"
                className="input-main large disable"
                value={unallocatedInGameBalance}
              />
            </div>

            <div>
              <label htmlFor="allocated" className="game-label">
                <h5>Allocated in-game balance</h5>
                <Tooltip info="Balance owned by All Players" />
              </label>
              <Input
                disabled
                type="number"
                id="allocated"
                className="input-main large disable"
                value={allocatedInGameBalance}
              />
            </div>

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
