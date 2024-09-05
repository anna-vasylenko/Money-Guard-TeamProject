import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const filtersSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const filtersReducer = filtersSlice.reducer;
