import { clusterApiUrl, PublicKey } from '@solana/web3.js';
import { ENV as ChainID } from '@solana/spl-token-registry';

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);
const clockSysvarAccount = new PublicKey('SysvarC1ock11111111111111111111111111111111');

const SOLLET_CHAINS = [
  {
    name: 'mainnet-beta',
    endpoint: 'https://solana-api.projectserum.com/',
    chainID: ChainID.MainnetBeta,
  },
  {
    name: 'testnet',
    endpoint: clusterApiUrl('testnet'),
    chainID: ChainID.Testnet,
  },
  {
    name: 'devnet',
    endpoint: clusterApiUrl('devnet'),
    chainID: ChainID.Devnet,
  },
  {
    name: 'localnet',
    endpoint: 'http://127.0.0.1:8899',
    chainID: ChainID.Devnet,
  },
];

export const solletConfig = {
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  SOLLET_CHAINS,
  clockSysvarAccount,
};
