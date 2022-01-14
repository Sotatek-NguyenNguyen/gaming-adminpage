import dynamic from "next/dynamic";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { AuthProvider } from "../contexts/authContext";
import { GlobalProvider } from "../contexts/globalContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");
import "../sass/main.scss";

const WalletConnectionProvider = dynamic(
  () =>
    import("../contexts/wallet").then(
      ({ WalletConnectionProvider }) => WalletConnectionProvider
    ),
  {
    ssr: false,
  }
);

function AdminApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <WalletConnectionProvider>
      <WalletModalProvider>
        <AuthProvider>
          <GlobalProvider>
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer
              hideProgressBar
              position="bottom-left"
              limit={2}
              newestOnTop
              closeButton={false}
              autoClose={2000}
              transition={Zoom}
            />
          </GlobalProvider>
        </AuthProvider>
      </WalletModalProvider>
    </WalletConnectionProvider>
  );
}

export default AdminApp;
