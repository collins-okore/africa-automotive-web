import { createSlice } from "@reduxjs/toolkit";
import { getPaymentTypes } from "./thunk";
export const initialState = {
  paymentTypes: {
    data: [],
    meta: {
      pagination: {
        page: 1,
        pageSize: 25,
        pageCount: 0,
        total: 0,
      },
    },
  },
  error: {},
  refreshList: false,
};

const PaymentTypeSlice = createSlice({
  name: "PaymentTypeSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getPaymentTypes.fulfilled, (state, action) => {
      state.paymentTypes.data = action.payload?.data || state.paymentTypes.data;
      state.paymentTypes.meta = action.payload?.meta || state.paymentTypes.meta;
    });
    builder.addCase(getPaymentTypes.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
  },
});

export default PaymentTypeSlice.reducer;
