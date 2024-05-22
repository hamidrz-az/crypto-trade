import { useContext } from "react";
import currencyListContext from "../store/currencyListContext";
import CurrencyTable from "./CurrencyTable";

function TopAssets() {
  const { currencyList } = useContext(currencyListContext);
  return <CurrencyTable currencies={currencyList} />;
}

export default TopAssets;
