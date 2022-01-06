import { Account, Connection } from '@solana/web3.js';
import { useEffect, useMemo, useState, createContext } from 'react';
import { TokenInfo } from '@solana/spl-token-registry';
import { useLocalStorageState } from '../hooks';
import { getCurrentChain } from '../shared/helper';

const DEFAULT_SLIPPAGE = 0.25;
const chain = getCurrentChain();
const { endpoint, name: env } = chain;

const ConnectionContext = createContext({
  connection: new Connection(endpoint, 'confirmed'),
  sendConnection: new Connection(endpoint, 'confirmed'),
  endpoint,
  slippage: DEFAULT_SLIPPAGE,
  setSlippage: (val) => {},
  env,
  tokens: [],
  tokenMap: new Map(),
});

export function ConnectionProvider({ children = undefined }) {
  const [slippage, setSlippage] = useLocalStorageState('slippage', DEFAULT_SLIPPAGE.toString());

  const connection = useMemo(() => new Connection(endpoint, 'confirmed'), []);
  const sendConnection = useMemo(() => new Connection(endpoint, 'confirmed'), []);

  const [tokens] = useState([]);
  const [tokenMap] = useState(new Map());

  // The websocket library solana/web3.js uses closes its websocket connection when the subscription list
  // is empty after opening its first time, preventing subsequent subscriptions from receiving responses.
  // This is a hack to prevent the list from every getting empty
  useEffect(() => {
    const id = connection.onAccountChange(new Account().publicKey, () => {});
    return () => {
      connection.removeAccountChangeListener(id);
    };
  }, [connection]);

  useEffect(() => {
    const id = connection.onSlotChange(() => null);
    return () => {
      connection.removeSlotChangeListener(id);
    };
  }, [connection]);

  useEffect(() => {
    const id = sendConnection.onAccountChange(new Account().publicKey, () => {});
    return () => {
      sendConnection.removeAccountChangeListener(id);
    };
  }, [sendConnection]);

  useEffect(() => {
    const id = sendConnection.onSlotChange(() => null);
    return () => {
      sendConnection.removeSlotChangeListener(id);
    };
  }, [sendConnection]);

  return (
    <ConnectionContext.Provider
      value={{
        connection,
        sendConnection,
        endpoint,
        slippage: parseFloat(slippage),
        setSlippage: (val) => setSlippage(val.toString()),
        env,
        tokens,
        tokenMap,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export default ConnectionContext;
