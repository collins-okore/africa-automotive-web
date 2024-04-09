import { createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getInspections as getInspectionsApi,
  getInspection as getInspectionApi,
  addNewInspection as addNewInspectionApi,
  inspect as inspectApi,
} from "../../helpers/backend_helper";

export const getInspections = createAsyncThunk(
  "inspections/getInspections",
  async (params) => {
    try {
      const response = getInspectionsApi(params);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getCertifiedInspections = createAsyncThunk(
  "inspections/getCertifiedInspections",
  async (params) => {
    try {
      const response = getInspectionsApi(params);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addNewInspection = createAsyncThunk(
  "inspections/addNewInspection",
  async (payload) => {
    try {
      const response = addNewInspectionApi(payload);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getInspection = createAsyncThunk(
  "inspections/getInspection",
  async (inspectionId) => {
    try {
      const response = getInspectionApi(inspectionId);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const inspect = createAsyncThunk(
  "inspections/inspect",
  async (payload) => {
    try {
      console.log("Inspecting...", payload);
      const response = inspectApi(payload);
      return response;
    } catch (error) {
      return error;
    }
  }
);
