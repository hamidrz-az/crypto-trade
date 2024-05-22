import { useContext } from "react";
import CurrencyTable from "./CurrencyTable";
import selectedCurrencyContext from "../store/selectedCurrencyContext";

function AssetsHistory() {
  const { userCurrencyHistory } = useContext(selectedCurrencyContext);
  return <CurrencyTable currencies={userCurrencyHistory.reverse()} />;
}

export default AssetsHistory;
