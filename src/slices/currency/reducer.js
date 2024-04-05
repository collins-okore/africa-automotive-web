import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrencies,
  addNewCurrency,
  updateCurrency,
  deleteCurrency,
} from "./thunk";
export const initialState = {
  currency: {
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

const CurrencySlice = createSlice({
  name: "CurrencySlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrencies.fulfilled, (state, action) => {
      state.currency.data = action.payload?.data || state.currency.data;
      state.currency.meta = action.payload?.meta || state.currency.meta;
    });
    builder.addCase(getCurrencies.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
    builder.addCase(addNewCurrency.fulfilled, () => {});
    builder.addCase(addNewCurrency.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(updateCurrency.fulfilled, () => {});
    builder.addCase(updateCurrency.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteCurrency.fulfilled, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteCurrency.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export default CurrencySlice.reducer;
