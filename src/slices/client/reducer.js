import { createSlice } from "@reduxjs/toolkit";
import {
  getClients,
  getClient,
  addNewClient,
  updateClient,
  deleteClient,
} from "./thunk";
export const initialState = {
  clients: {
    data: [],
    meta: {
      page: 1,
      pageSize: 25,
      pageCount: 0,
      total: 0,
    },
  },
  client: {
    email: "",
    phoneCode: "",
    phoneNumber: "",
    firstName: "",
    otherNames: "",
    postalAddress: "",
    postalCode: "",
    idOrPassport: "",
    tpinNumber: "",
  },
  error: {},
  refreshList: false,
};

const ClientSlice = createSlice({
  name: "ClientSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getClients.fulfilled, (state, action) => {
      state.clients.data = action.payload?.data || state.clients.data;
      state.clients.meta = action.payload?.meta || state.clients.meta;
    });
    builder.addCase(getClient.fulfilled, (state, action) => {
      state.client = action.payload?.data || state.client;
    });
    builder.addCase(getClients.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(addNewClient.fulfilled, () => {});
    builder.addCase(addNewClient.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(updateClient.fulfilled, () => {});
    builder.addCase(updateClient.rejected, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteClient.fulfilled, (state, action) => {
      state.error = action.error?.message || null;
    });
    builder.addCase(deleteClient.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export default ClientSlice.reducer;
