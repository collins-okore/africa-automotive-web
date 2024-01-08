import { createSlice } from "@reduxjs/toolkit";
import { getInspections } from "./thunk";
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
      state.error = action.payload.error || null;
    });
  },
});

export default InspectionSlice.reducer;
