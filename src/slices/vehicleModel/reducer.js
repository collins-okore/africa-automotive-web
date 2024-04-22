import { createSlice } from "@reduxjs/toolkit";
import {
  getVehicleModels,
  addNewVehicleModel,
  updateVehicleModel,
  deleteVehicleModel,
} from "./thunk";
export const initialState = {
  vehicleModel: {
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

const VehicleModelSlice = createSlice({
  name: "VehicleModelSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getVehicleModels.fulfilled, (state, action) => {
      state.vehicleModel.data = action.payload?.data || state.vehicleModel.data;
      state.vehicleModel.meta = action.payload?.meta || state.vehicleModel.meta;
    });
    builder.addCase(getVehicleModels.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
    builder.addCase(addNewVehicleModel.fulfilled, () => {});
    builder.addCase(addNewVehicleModel.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(updateVehicleModel.fulfilled, () => {});
    builder.addCase(updateVehicleModel.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteVehicleModel.fulfilled, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteVehicleModel.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export default VehicleModelSlice.reducer;
