import { useState, useEffect, createContext } from "react";
import Axios from "../config/Axios";

const DEFAULT_INTERVAL = "1D";
export const INTERVALS = {
  "1D": 1,
  "1W": 7,
  "1M": 30,
  "6M": 180,
  "1Y": 365,
};

const selectedCurrencyContext = createContext({});

export const SelectedCurrencyProvider = (props) => {
  const [currencyData, setCurrencyData] = useState([]);
  const [userCurrencyHistory, setUserCurrencyHistory] = useState(
    JSON.parse(localStorage.getItem("userCurrencyHistory"))
  );
  const [selectedInterval, setInterval] = useState(DEFAULT_INTERVAL);
  const [id, setId] = useState(null);

  useEffect(() => {
    let string = JSON.stringify(userCurrencyHistory);
    localStorage.setItem("userCurrencyHistory", string);
  }, [userCurrencyHistory]);

  const getCurrencyDataHistory = async (id, interval = selectedInterval) => {
    const interval_ = interval === DEFAULT_INTERVAL ? "h2" : "d1";
    const start = new Date();
    start.setDate(start.getDate() - INTERVALS[interval]);
    const end = new Date();
    const url = `/assets/${id}/history?interval=${interval_}&start=${start.getTime()}&end=${end.getTime()}`;
    const response = await Axios.get(url);
    setCurrencyData(response.data.data);
    setId(id);
    setInterval(interval);
  };

  const addCurrencyToHistory = (currency) => {
    if (userCurrencyHistory.indexOf(currency) === -1) {
      setUserCurrencyHistory([...userCurrencyHistory, currency]);
    }
  };

  const values = {
    currencyData: currencyData,
    getHistory: getCurrencyDataHistory,
    selected_id: id,
    intervalDate: selectedInterval,
    userCurrencyHistory: userCurrencyHistory,
    addCurrencyToHistory: addCurrencyToHistory,
  };

  return (
    <selectedCurrencyContext.Provider value={values}>
      {props.children}
    </selectedCurrencyContext.Provider>
  );
};

export default selectedCurrencyContext;
