export const selectTransactions = (state) => state.transactions.items;
export const selectPeriodTransactions = (state) =>
  state.transactions.periodTransactions;
export const selectCurrentTransaction = (state) =>
  state.transactions.currentTransaction;
export const selectCategories = (state) => state.transactions.categories;
export const selectIsLoading = (state) => state.transactions.isLoading;
export const selectIsError = (state) => state.transactions.isError;
