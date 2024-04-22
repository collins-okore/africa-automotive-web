import { createSlice } from "@reduxjs/toolkit";
import {
  getVehicleBodyColors,
  addNewVehicleBodyColor,
  updateVehicleBodyColor,
  deleteVehicleBodyColor,
} from "./thunk";
export const initialState = {
  vehicleBodyColor: {
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

const VehicleBodyColorSlice = createSlice({
  name: "VehicleBodyColorSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getVehicleBodyColors.fulfilled, (state, action) => {
      state.vehicleBodyColor.data =
        action.payload?.data || state.vehicleBodyColor.data;
      state.vehicleBodyColor.meta =
        action.payload?.meta || state.vehicleBodyColor.meta;
    });
    builder.addCase(getVehicleBodyColors.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
    builder.addCase(addNewVehicleBodyColor.fulfilled, () => {});
    builder.addCase(addNewVehicleBodyColor.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(updateVehicleBodyColor.fulfilled, () => {});
    builder.addCase(updateVehicleBodyColor.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteVehicleBodyColor.fulfilled, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteVehicleBodyColor.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export default VehicleBodyColorSlice.reducer;
