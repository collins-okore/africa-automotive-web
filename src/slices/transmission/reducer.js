import { createSlice } from "@reduxjs/toolkit";
import { getTransmissions } from "./thunk";
export const initialState = {
  vehicleTransmission: {
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

const TransmissionSlice = createSlice({
  name: "TransmissionSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getTransmissions.fulfilled, (state, action) => {
      state.vehicleTransmission.data =
        action.payload?.data || state.vehicleTransmission.data;
      state.vehicleTransmission.meta =
        action.payload?.meta || state.vehicleTransmission.meta;
    });
    builder.addCase(getTransmissions.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
  },
});

export default TransmissionSlice.reducer;
