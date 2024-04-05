import { createSlice } from "@reduxjs/toolkit";
import {
  getInspectionFees,
  addNewInspectionFee,
  updateInspectionFee,
  deleteInspectionFee,
} from "./thunk";
export const initialState = {
  inspectionFee: {
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

const InspectionFeeSlice = createSlice({
  name: "InspectionFeeSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getInspectionFees.fulfilled, (state, action) => {
      state.inspectionFee.data =
        action.payload?.data || state.inspectionFee.data;
      state.inspectionFee.meta =
        action.payload?.meta || state.inspectionFee.meta;
    });
    builder.addCase(getInspectionFees.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
    builder.addCase(addNewInspectionFee.fulfilled, () => {});
    builder.addCase(addNewInspectionFee.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(updateInspectionFee.fulfilled, () => {});
    builder.addCase(updateInspectionFee.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteInspectionFee.fulfilled, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteInspectionFee.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export default InspectionFeeSlice.reducer;
