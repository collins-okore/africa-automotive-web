import { createSlice } from "@reduxjs/toolkit";
import {
  getCountries,
  addNewCountry,
  updateCountry,
  deleteCountry,
} from "./thunk";
export const initialState = {
  country: {
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

const CountrySlice = createSlice({
  name: "CountrySlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.country.data = action.payload?.data || state.country.data;
      state.country.meta = action.payload?.meta || state.country.meta;
    });
    builder.addCase(getCountries.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
    builder.addCase(addNewCountry.fulfilled, () => {});
    builder.addCase(addNewCountry.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(updateCountry.fulfilled, () => {});
    builder.addCase(updateCountry.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteCountry.fulfilled, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteCountry.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export default CountrySlice.reducer;
