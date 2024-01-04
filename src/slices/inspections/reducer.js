import { createSlice } from "@reduxjs/toolkit";
import {
  getInspections,
  addNewInvoice,
  updateInvoice,
  deleteInvoice,
} from "./thunk";
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
      state.isInspectionCreated = false;
      state.isInspectionSuccess = true;
    });
    builder.addCase(getInspections.rejected, (state, action) => {
      state.error = action.payload.error || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
    builder.addCase(addNewInvoice.fulfilled, (state, action) => {
      state.invoices.push(action.payload);
      state.isInvoiceCreated = true;
    });
    builder.addCase(addNewInvoice.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(updateInvoice.fulfilled, () => {});
    builder.addCase(updateInvoice.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(deleteInvoice.fulfilled, (state, action) => {
      state.invoices = state.invoices.filter(
        (invoice) =>
          invoice._id.toString() !== action.payload.invoice.toString()
      );
    });
    builder.addCase(deleteInvoice.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export default InspectionSlice.reducer;
