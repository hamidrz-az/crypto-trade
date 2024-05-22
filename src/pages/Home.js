import { useState, useContext } from "react";
import selectedCurrencyContext, {
  INTERVALS,
} from "../store/selectedCurrencyContext";
import currencyListContext from "../store/currencyListContext";
import Chart from "../components/Chart";
import TopAssets from "../components/TopAssets";
import AssetsHistory from "../components/AssetsHistory";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const OPTION_HOUR_MINUT = {
  hour: "2-digit",
  minute: "2-digit",
};

const OPTION_MONTH_DAY = {
  day: "numeric",
  month: "long",
};

const OPTION_MONTH_YEAR = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const Home = () => {
  const ctx = useContext(selectedCurrencyContext);
  const currencies = useContext(currencyListContext).currencyList;
  const [searchPhrase, setSearchPhrase] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onSearchChange = (event) => {
    setSearchPhrase(event.target.value);
    let matched = currencies.filter((currency) =>
      currency.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    if (matched.length > 5 && event.target.value !== "") {
      matched = matched.slice(0, 5);
    } else if (event.target.value === "") {
      matched = [];
    }

    setSuggestions(matched);
  };

  const selectedSearchedCurrency = (currency) => {
    ctx.getHistory(currency.id);
    ctx.addCurrencyToHistory(currency);
    setSearchPhrase("");
    setSuggestions([]);
  };

  const generateLabels = () => {
    console.log(ctx.currencyData);
    let options =
      ctx.intervalDate === "1D" ? OPTION_HOUR_MINUT : OPTION_MONTH_DAY;
    options = ["6M", "1Y"].includes(ctx.intervalDate)
      ? OPTION_MONTH_YEAR
      : options;
    return ctx.currencyData.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleString("en-US", options);
    });
  };

  return (
    <main className="main">
      <section>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search ..."
            value={searchPhrase}
            onChange={onSearchChange}
          />
          {suggestions.length > 0 && (
            <ul className="suggestion-box">
              {suggestions.map((currency) => (
                <li
                  key={currency.id}
                  onClick={() => selectedSearchedCurrency(currency)}
                >
                  {currency.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <section>
        <div className="intervals">
          {Object.keys(INTERVALS).map((interval) => (
            <button
              className={`interval-btn ${
                interval === ctx.intervalDate && "active"
              }`}
              onClick={() => {
                ctx.getHistory(ctx.selected_id, interval);
              }}
              key={interval}
            >
              {interval}
            </button>
          ))}
        </div>
        <Chart
          data={ctx.currencyData.map((item) => item.priceUsd)}
          labels={generateLabels()}
          selectedCurrency={currencies.find(
            (currency) => currency.id === ctx.selected_id
          )}
        />
      </section>
      <section>
        <Tabs className="tabs">
          <TabList>
            <Tab>Top Assets</Tab>
            <Tab>Your History</Tab>
          </TabList>
          <TabPanel>
            <TopAssets />
          </TabPanel>
          <TabPanel>
            <AssetsHistory />
          </TabPanel>
        </Tabs>
      </section>
    </main>
  );
};

export default Home;
