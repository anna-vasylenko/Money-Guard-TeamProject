import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
});

export const transactionsReducer = transactionsSlice.reducer;
