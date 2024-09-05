import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { transactionsReducer } from "./transaction/slice";
import { filtersReducer } from "./filters/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionsReducer,
    filter: filtersReducer,
  },
});
