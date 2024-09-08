import { createSlice } from "@reduxjs/toolkit";
import { logoutThunk } from "../auth/operations";

const initialState = {
  isLogOutModalOpen: false,
  isEditModalOpen: false,
  isAddModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLogOutModal(state) {
      state.isLogOutModalOpen = true;
      console.log(state);
    },
    openEditModal(state) {
      state.isEditModalOpen = true;
    },
    openAddModal(state) {
      state.isAddModalOpen = true;
    },
    closeModal() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, () => {
      return initialState;
    });
  },
});

export const { openLogOutModal, openEditModal, openAddModal, closeModal } =
  modalSlice.actions;
export const modalReducer = modalSlice.reducer;
