import  { useContext } from "react";
import selectedCurrencyContext from "../store/selectedCurrencyContext";

function CurrencyTable({ currencies }) {
  const { getHistory, addCurrencyToHistory } = useContext(selectedCurrencyContext);

  const selectCurrency = (currency) => {
    getHistory(currency.id);
    addCurrencyToHistory(currency);
  };

  return (
    <ul className="currency_table">
      <li className="header">
        <h4>Name</h4>
        <h4>Price</h4>
        <h4>Changes(24Hr)</h4>
      </li>
      {currencies?.slice(0, 5).map((currency) => (
        <li
          key={currency.id}
          className="row"
          onClick={() => selectCurrency(currency)}
        >
          <span>{currency.name}</span>
          <span>${Math.round(currency.priceUsd * 100) / 100}</span>
          <span
            style={{
              color: currency.changePercent24Hr >= 0 ? "#56e372" : "#e65c5c",
            }}
          >
            {Math.round(currency.changePercent24Hr * 100) / 100}%
          </span>
        </li>
      ))}
    </ul>
  );
}

export default CurrencyTable;
