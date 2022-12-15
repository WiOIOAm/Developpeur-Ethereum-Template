import React from "react";
import { Routes, Route } from "react-router-dom";
import { EthProvider } from "contexts/EthContext";

// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/nucleo-icons.css";
// developpement styles import "assets/scss/blk-design-system-pro-react.scss?v1.2.0";
import "assets/css/blk-design-system-pro-react.min.css";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";

// core components
import ColorNavbar from "components/Navbars/ColorNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
// components
import Ecommerce from "./pages/Ecommerce.js";
import Error404 from "./pages/Error404.js";
import AccountSettings from "./pages/AccountSettings.js";
import Agenda from "./pages/Agenda.js";

function App() {
  return (
    <EthProvider>
      <ColorNavbar />
      <Routes>
        <Route path="/" element={<Ecommerce />} />
        <Route path="/dashboard" element={<AccountSettings />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

      <DemoFooter />
    </EthProvider>
  );
}

export default App;
