import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getClients as getClientsApi,
  getClient as getClientApi,
  addNewClient as addNewClientApi,
  updateClient as updateClientApi,
  deleteClient as deleteClientApi,
} from "../../helpers/backend_helper";

export const getClients = createAsyncThunk(
  "client/getClients",
  async (params) => {
    try {
      const response = await getClientsApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const getClient = createAsyncThunk(
  "client/getClient",
  async (params) => {
    try {
      const response = await getClientApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const addNewClient = createAsyncThunk(
  "client/addNewClient",
  async (payload) => {
    try {
      const response = await addNewClientApi(payload.data, payload.params);
      toast.success("Client Added Successfully", { autoClose: 3000 });

      return response;
    } catch (error) {
      toast.error("Client Creation Failed", {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async (client) => {
    try {
      const response = await updateClientApi(client);
      toast.success("Client Updated Successfully", { autoClose: 3000 });
      const data = response;
      return data;
    } catch (error) {
      toast.error("Client Update Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (client) => {
    try {
      const response = await deleteClientApi(client);
      toast.success("Client Deleted Successfully", { autoClose: 3000 });
      return { client, ...response };
    } catch (error) {
      toast.error("Client Deletion Failed", { autoClose: 3000 });
      return error;
    }
  }
);
