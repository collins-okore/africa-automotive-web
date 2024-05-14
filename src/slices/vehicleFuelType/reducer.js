import { createSlice } from "@reduxjs/toolkit";
import { getFuelTypes } from "./thunk";
export const initialState = {
  vehicleFuelType: {
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

const FuelTypeSlice = createSlice({
  name: "FuelTypeSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getFuelTypes.fulfilled, (state, action) => {
      state.vehicleFuelType.data =
        action.payload?.data || state.vehicleFuelType.data;
      state.vehicleFuelType.meta =
        action.payload?.meta || state.vehicleFuelType.meta;
    });
    builder.addCase(getFuelTypes.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
  },
});

export default FuelTypeSlice.reducer;
