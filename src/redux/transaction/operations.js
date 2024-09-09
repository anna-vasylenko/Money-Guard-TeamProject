import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBalanceThunk } from "../auth/operations";
import toast from "react-hot-toast";
import { toasterCustomStyles } from "../../helpers/toasterCustomStyles";

export const getTransactions = createAsyncThunk(
  "transactions/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/transactions");
      return data;
    } catch (error) {
      toast.error(
        "Unable to load your transactions at the moment. Please try again later.",
        toasterCustomStyles
      );
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
      toast.error(
        "There was an issue adding your transaction. Please check the details and try again.",
        toasterCustomStyles
      );
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
      toast.error(
        "Failed to delete the transaction. Please refresh the page and try again.",
        toasterCustomStyles
      );
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
      return data;
    } catch (error) {
      toast.error(
        "Unable to update the transaction. Please check the details and try again.",
        toasterCustomStyles
      );
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
