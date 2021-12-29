import dynamic from 'next/dynamic';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { AuthProvider } from '../contexts/authContext';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');
import "../sass/main.scss";

const WalletConnectionProvider = dynamic(
  () =>
    import('../contexts/wallet').then(({ WalletConnectionProvider }) => WalletConnectionProvider),
  {
    ssr: false,
  }
);

function AdminApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return <WalletConnectionProvider>
    <WalletModalProvider>
      <AuthProvider>
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
    </WalletModalProvider>
  </WalletConnectionProvider>;
}

export default AdminApp;
