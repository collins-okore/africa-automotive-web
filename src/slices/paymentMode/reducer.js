import { createSlice } from "@reduxjs/toolkit";
import { getPaymentModes } from "./thunk";
export const initialState = {
  paymentModes: {
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

const PaymentModeSlice = createSlice({
  name: "PaymentModeSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getPaymentModes.fulfilled, (state, action) => {
      state.paymentModes.data = action.payload?.data || state.paymentModes.data;
      state.paymentModes.meta = action.payload?.meta || state.paymentModes.meta;
    });
    builder.addCase(getPaymentModes.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
  },
});

export default PaymentModeSlice.reducer;
