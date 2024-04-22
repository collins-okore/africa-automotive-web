import { createSlice } from "@reduxjs/toolkit";
import { getUsers, addNewUser, updateUser } from "./thunk";
export const initialState = {
  users: {
    data: [],
    meta: {
      page: 1,
      pageSize: 25,
      pageCount: 0,
      total: 0,
    },
  },
  user: {},
  error: {},
  refreshList: false,
};

const useSelectorSlice = createSlice({
  name: "useSelectorSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users.data = action.payload.data || state.users.data;
      state.users.meta = action.payload?.meta || state.users.meta;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
    builder.addCase(addNewUser.fulfilled, () => {});
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(updateUser.fulfilled, () => {});
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
  },
});

export default useSelectorSlice.reducer;
