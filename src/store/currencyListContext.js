import { useState, createContext } from "react";
import Axios from "../config/Axios";

const currencyListContext = createContext({});

export const CurrencyListProvider = (props) => {
  const [currencyList, setCurrencyList] = useState([]);
  const [exchanges, setExchanges] = useState([]);

  const getCurrencyList = () => {
    Axios.get("/assets")
      .then(({ data }) => {
        setCurrencyList(data.data);
      })
      .catch(() => {
        setCurrencyList([]);
      });
  };

  const getExchanges = () => {
    Axios.get("/exchanges")
      .then(({ data }) => {
        //sort the data based on the rank number
        setExchanges(data.data.sort((a, b) => a.rank - b.rank));
      })
      .catch(() => {
        setExchanges([]);
      });
  };

  const values = {
    currencyList: currencyList,
    exchanges: exchanges,
    getCurrencyList: getCurrencyList,
    getExchanges: getExchanges,
  };

  return (
    <currencyListContext.Provider value={values}>
      {props.children}
    </currencyListContext.Provider>
  );
};

export default currencyListContext;
