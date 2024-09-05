import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { transactionsReducer } from "./transaction/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionsReducer,
  },
});
