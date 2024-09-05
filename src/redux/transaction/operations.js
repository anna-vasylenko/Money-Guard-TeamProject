// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchTransactions = createAsyncThunk(
//   "transactions/fetchAll",
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await axios.get("/contacts");
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const addTransaction = createAsyncThunk(
//   "transactions/addContact",
//   async (contact, thunkAPI) => {
//     try {
//       const { data } = await axios.post("/contacts", contact);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteTransaction = createAsyncThunk(
//   "transactions/deleteContact",
//   async (id, thunkAPI) => {
//     try {
//       const { data } = await axios.delete(`/contacts/${id}`);
//       return data.id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
//   {
//     condition: (_, thunkAPI) => {
//       const isLoading = thunkAPI.getState().contacts.loading;
//       if (isLoading) {
//         return false;
//       }
//     },
//   }
// );

// export const updateTransaction = createAsyncThunk(
//   "transactions/updateContact",
//   async ({ name, number, id }, thunkApi) => {
//     try {
//       const { data } = await axios.patch(`/contacts/${id}`, { name, number });

//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );
