import { createSlice } from "@reduxjs/toolkit";
import { getPayments, addNewPayment, updatePayment } from "./thunk";
export const initialState = {
  payment: {
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

const PaymentSlice = createSlice({
  name: "PaymentSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getPayments.fulfilled, (state, action) => {
      state.payment.data = action.payload?.data || state.payment.data;
      state.payment.meta = action.payload?.meta || state.payment.meta;
    });
    builder.addCase(getPayments.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
    builder.addCase(addNewPayment.fulfilled, () => {});
    builder.addCase(addNewPayment.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(updatePayment.fulfilled, () => {});
    builder.addCase(updatePayment.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
  },
});

export default PaymentSlice.reducer;
