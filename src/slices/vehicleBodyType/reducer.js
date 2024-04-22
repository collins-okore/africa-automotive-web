import { createSlice } from "@reduxjs/toolkit";
import {
  getVehicleBodyTypes,
  addNewVehicleBodyType,
  updateVehicleBodyType,
  deleteVehicleBodyType,
} from "./thunk";
export const initialState = {
  vehicleBodyType: {
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

const VehicleBodyTypeSlice = createSlice({
  name: "VehicleBodyTypeSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getVehicleBodyTypes.fulfilled, (state, action) => {
      state.vehicleBodyType.data =
        action.payload?.data || state.vehicleBodyType.data;
      state.vehicleBodyType.meta =
        action.payload?.meta || state.vehicleBodyType.meta;
    });
    builder.addCase(getVehicleBodyTypes.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
    builder.addCase(addNewVehicleBodyType.fulfilled, () => {});
    builder.addCase(addNewVehicleBodyType.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(updateVehicleBodyType.fulfilled, () => {});
    builder.addCase(updateVehicleBodyType.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteVehicleBodyType.fulfilled, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteVehicleBodyType.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export default VehicleBodyTypeSlice.reducer;
