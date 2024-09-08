import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.monobank.ua/",
});

const CURRENCY_CACHE_KEY = "currencyRates";

const fetchCurrencyData = async () => {
  try {
    const response = await instance.get("bank/currency");
    console.log("Fetched data from API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch currency data:", error.message);
    throw new Error("Failed to fetch currency data");
  }
};

const getCachedCurrencyData = () => {
  const cachedData = JSON.parse(localStorage.getItem(CURRENCY_CACHE_KEY));
  if (cachedData && Date.now() - cachedData.timestamp < 3600000) {
    console.log("Using cached data:", cachedData);
    return cachedData;
  }
  return null;
};

const cacheCurrencyData = (data) => {
  const now = Date.now();
  const usd = data.find(
    (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
  );
  const eur = data.find(
    (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
  );

  const currencyData = {
    timestamp: now,
    usdRate: usd
      ? { rateBuy: usd.rateBuy, rateSell: usd.rateSell.toFixed(2) }
      : { rateBuy: 0, rateSell: 0 },
    euroRate: eur
      ? { rateBuy: eur.rateBuy, rateSell: eur.rateSell.toFixed(2) }
      : { rateBuy: 0, rateSell: 0 },
  };

  console.log("Caching new data:", currencyData);
  localStorage.setItem(CURRENCY_CACHE_KEY, JSON.stringify(currencyData));
  return currencyData;
};

export const getCurrencyRates = async () => {
  const cachedData = getCachedCurrencyData();
  if (cachedData) {
    return cachedData;
  }

  const data = await fetchCurrencyData();
  return cacheCurrencyData(data);
};
