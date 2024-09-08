import { createSlice } from "@reduxjs/toolkit";
import { logoutThunk } from "../auth/operations";
import {
  addTransaction,
  deleteTransaction,
  getPeriodTransactions,
  getTransactions,
  getTransactionsCategories,
  updateTransaction,
} from "./operations";
import { handleFulFilled, handlePending, handleRejected } from "../handlers";

const initialState = {
  items: [],
  periodTransactions: [],
  currentTransaction: null,
  categories: [],
  isLoading: false,
  isError: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setCurrentTransaction(state, action) {
      state.currentTransaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.currentTransaction = null;
      })

      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === state.currentTransaction.id ? action.payload : item
        );
        state.currentTransaction = null;
      })
      .addCase(getPeriodTransactions.fulfilled, (state, action) => {
        state.periodTransactions = action.payload;
      })
      .addCase(getTransactionsCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addMatcher(({ type }) => type.endsWith("pending"), handlePending)
      .addMatcher(({ type }) => type.endsWith("rejected"), handleRejected)
      .addMatcher(({ type }) => type.endsWith("fulfilled"), handleFulFilled);
  },
});

export const { setCurrentTransaction } = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
