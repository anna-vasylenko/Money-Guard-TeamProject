import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBalanceThunk } from "../auth/operations";

export const getTransactions = createAsyncThunk(
  "transactions/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/transactions");
      console.log(data);

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
      thunkAPI.dispatch(getBalanceThunk());
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
      thunkAPI.dispatch(getBalanceThunk());
      thunkAPI.dispatch(getTransactions());
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
  async ({ transactionDate, comment, amount, id }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/api/transactions/${id}`, {
        transactionDate,
        comment,
        amount,
      });
      thunkAPI.dispatch(getBalanceThunk());
      thunkAPI.dispatch(getTransactions());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPeriodTransactions = createAsyncThunk(
  "transactions/getPeriodTransactions",
  async (period, thunkAPI) => {
    try {
      const { month, year } = period;
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
      console.log(data);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
