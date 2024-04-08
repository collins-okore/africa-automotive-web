import { createSlice } from "@reduxjs/toolkit";
import { getInspections, getInspection, inspect } from "./thunk";
export const initialState = {
  inspections: {
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
  inspection: {
    id: "",
    vehicleMake: "",
    vehicleModel: "",
    chasisNumber: "",
    customsReferenceNumber: "",
    countryOfOrigin: "",
    color: "",
    engineNumber: "",
    yearOfManufacture: "",
    odometerOnEC: "",
  },
  error: {},
};

const InspectionSlice = createSlice({
  name: "InspectionSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getInspections.fulfilled, (state, action) => {
      state.inspections.data = action.payload.data;
      state.inspections.meta = action.payload.meta;
    });
    builder.addCase(getInspections.rejected, (state, action) => {
      state.error = { errorExists: true };
    });
    builder.addCase(getInspection.fulfilled, (state, action) => {
      state.inspection = action.payload.data;
    });
    builder.addCase(inspect.fulfilled, () => {});
    builder.addCase(inspect.rejected, () => {});
  },
});

export default InspectionSlice.reducer;
