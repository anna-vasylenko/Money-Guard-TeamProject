import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const instance = axios.create({
  baseURL: "https://api.monobank.ua/",
});

const CURRENCY_CACHE_KEY = "currencyRates";

export const fetchCurrencyRates = createAsyncThunk(
  "bank/currency",
  async (_, thunkAPI) => {
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

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
