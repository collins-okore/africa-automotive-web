import { createSlice } from "@reduxjs/toolkit";
import {
  getVehicleMakes,
  addNewVehicleMake,
  updateVehicleMake,
  deleteVehicleMake,
} from "./thunk";
export const initialState = {
  vehicleMake: {
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

const VehicleMakeSlice = createSlice({
  name: "VehicleMakeSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getVehicleMakes.fulfilled, (state, action) => {
      state.vehicleMake.data = action.payload?.data || state.vehicleMake.data;
      state.vehicleMake.meta = action.payload?.meta || state.vehicleMake.meta;
    });
    builder.addCase(getVehicleMakes.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
    builder.addCase(addNewVehicleMake.fulfilled, () => {});
    builder.addCase(addNewVehicleMake.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(updateVehicleMake.fulfilled, () => {});
    builder.addCase(updateVehicleMake.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteVehicleMake.fulfilled, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteVehicleMake.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export default VehicleMakeSlice.reducer;
