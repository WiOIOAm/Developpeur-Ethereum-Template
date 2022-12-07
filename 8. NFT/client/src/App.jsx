import React from "react";
import { Routes, Route } from "react-router-dom";
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
  return (
    <Routes>
      <Route path="/" element={<Ecommerce />} />
    </Routes>
  );
}

export default App;
