export const handlePending = (state) => {
  state.error = false;
  state.loading = true;
};
export const handleRejected = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

export const handleFulFilled = (state) => {
  state.loading = false;
};
