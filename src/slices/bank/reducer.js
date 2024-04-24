import { createSlice } from "@reduxjs/toolkit";
import { getBanks, addNewBank, updateBank } from "./thunk";
export const initialState = {
  bank: {
    data: [],
    meta: {
      page: 1,
      pageSize: 25,
      pageCount: 0,
      total: 0,
    },
  },
  error: {},
  refreshList: false,
};

const BankSlice = createSlice({
  name: "BankSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getBanks.fulfilled, (state, action) => {
      state.bank.data = action.payload?.data || state.bank.data;
      state.bank.meta = action.payload?.meta || state.bank.meta;
    });
    builder.addCase(getBanks.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
    builder.addCase(addNewBank.fulfilled, () => {});
    builder.addCase(addNewBank.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(updateBank.fulfilled, () => {});
    builder.addCase(updateBank.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
  },
});

export default BankSlice.reducer;
