import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useAuth, useGlobal } from ".";
import { getJSON } from "../common";

export const useGameBalance = () => {
  const { connected } = useWallet();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { gameData } = useGlobal();

  const [actualGameBalance, setActualGameBalance] = useState("");
  const [allocatedInGameBalance, setAllocatedInGameBalance] = useState("");
  const [unallocatedInGameBalance, setUnallocatedInGameBalance] = useState("");

  const convertToExactFormat = useCallback((num) => {
    return num / Math.pow(10, gameData?.tokenDecimals);
  }, [gameData]);

  const getGameBalance = async () => {
    try {
      const res = await getJSON(`/admin/game-balance`);
      setActualGameBalance(convertToExactFormat(res?.actualGameBalance));
      setUnallocatedInGameBalance(
        convertToExactFormat(res?.unallocatedInGameBalance)
      );
      setAllocatedInGameBalance(
        convertToExactFormat(res?.allocatedInGameBalance)
      );
    } catch (error) {
      throw error;
    }
  };

  const resetGameBalance = async () => {
    try {
      const res = await getJSON(`/admin/game-balance`);
      setActualGameBalance(convertToExactFormat(res?.actualGameBalance));
      setUnallocatedInGameBalance(
        convertToExactFormat(res?.unallocatedInGameBalance)
      );
      setAllocatedInGameBalance(
        convertToExactFormat(res?.allocatedInGameBalance)
      );
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getGameBalance().catch((err) => console.error(err.message));
      const interval = setInterval(() => resetGameBalance(), 7000);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (!connected || (connected && !isAuthenticated)) {
      router.push("/");
    }
  }, [router, connected, isAuthenticated]);

  return {
    actualGameBalance,
    unallocatedInGameBalance,
    allocatedInGameBalance,
  };
};
