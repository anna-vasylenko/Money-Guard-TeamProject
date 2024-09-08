import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getBalanceThunk,
  loginThunk,
  logoutThunk,
  refreshUserThunk,
  registerThunk,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isError = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isError = null;
      })
      .addCase(logoutThunk.pending, () => {
        return initialState;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(refreshUserThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUserThunk.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(getBalanceThunk.fulfilled, (state, action) => {
        state.user.balance = action.payload;
      })
      .addMatcher(
        isAnyOf(registerThunk.rejected, loginThunk.rejected),
        (state, action) => {
          state.isError = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(registerThunk.pending, loginThunk.pending),
        (state) => {
          state.isError = false;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
