import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTransactions = createAsyncThunk(
  "transactions/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/transactions");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/transactions", transaction);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/api/transactions/${id}`);
      return data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const isLoading = thunkAPI.getState().transactions.isLoading;
      if (isLoading) {
        return false;
      }
    },
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ transactionDate, comment, amount, id }, thunkApi) => {
    try {
      const { data } = await axios.patch(`/api/transactions/${id}`, {
        transactionDate,
        comment,
        amount,
      });

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getPeriodTransactions = createAsyncThunk(
  "transactions/getPeriodTransactions",
  async (period, thunkAPI) => {
    try {
      // console.log(period);
      const { month, year } = period;
      // console.log(year);
      if (month || year) {
        const { data } = await axios.get("/api/transactions-summary", {
          params: { month, year },
        });
        console.log(data);

        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTransactionsCategories = createAsyncThunk(
  "transactions/getCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/transaction-categories");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
