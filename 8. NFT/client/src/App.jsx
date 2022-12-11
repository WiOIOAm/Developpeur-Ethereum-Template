import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";

// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/nucleo-icons.css";
// developpement styles import "assets/scss/blk-design-system-pro-react.scss?v1.2.0";
import "assets/css/blk-design-system-pro-react.min.css";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";

// components
import Ecommerce from "./pages/Ecommerce.js";

function App() {
  const chains = [polygonMumbai];
  const walletProjectId = process.env.REACT_APP_WALLETCONNECT;
  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: walletProjectId }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: "web3Modal", chains }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Routes>
          <Route path="/" element={<Ecommerce />} />
        </Routes>
      </WagmiConfig>

      <Web3Modal projectId={walletProjectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
