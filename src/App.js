import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Exchanges from "./pages/Exchanges";
import Navbar from "./components/Navbar";
import selectedCurrencyContext from "./store/selectedCurrencyContext";
import currencyListContext from "./store/currencyListContext";
import "./Style/styles.scss";

function App() {
  const { getHistory } = useContext(selectedCurrencyContext);
  const { getCurrencyList, getExchanges } = useContext(currencyListContext);

  useEffect(() => {
    getCurrencyList();
    getExchanges();
    getHistory("bitcoin");
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchanges" element={<Exchanges />} />
      </Routes>
    </div>
  );
}

export default App;
