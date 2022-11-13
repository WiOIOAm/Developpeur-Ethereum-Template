import { EthProvider } from "./contexts/EthContext";
import ThemeProvider from "./theme";
import Router from "./routes";

import ScrollToTop from "./components/scroll-to-top";

function App() {
  return (
    <EthProvider>
      <ThemeProvider>
        <ScrollToTop />
        <Router />
      </ThemeProvider>
    </EthProvider>
  );
}

export default App;
