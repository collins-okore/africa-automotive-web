import { createSlice } from "@reduxjs/toolkit";
import { getFuelTypes } from "./thunk";
export const initialState = {
  fuelType: {
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

const FuelTypeSlice = createSlice({
  name: "FuelTypeSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getFuelTypes.fulfilled, (state, action) => {
      state.fuelType.data = action.payload?.data || state.fuelType.data;
      state.fuelType.meta = action.payload?.meta || state.fuelType.meta;
    });
    builder.addCase(getFuelTypes.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
  },
});

export default FuelTypeSlice.reducer;
