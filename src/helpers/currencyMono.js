import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.monobank.ua/",
});

const CURRENCY_CACHE_KEY = "currencyRates";

export const fetchCurrencyRates = async () => {
  try {
    const cachedData = localStorage.getItem(CURRENCY_CACHE_KEY);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - timestamp < 60 * 60 * 1000) {
        return data;
      }
    }

    const { data } = await instance.get("bank/currency");

    localStorage.setItem(
      CURRENCY_CACHE_KEY,
      JSON.stringify({ data, timestamp: new Date().getTime() })
    );
    return data;
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    return [];
  }
};
