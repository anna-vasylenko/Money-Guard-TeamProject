import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  periodTransactions: [],
  isLoading: false,
  isError: null,
  currentTransaction: null,
  categories: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    currentTransaction(state, action) {
      state.currentContact = action.payload;
    },
  },
});

export const transactionsReducer = transactionsSlice.reducer;
