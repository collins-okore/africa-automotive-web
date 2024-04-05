import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getInspectionFees as getInspectionFeesApi,
  addNewInspectionFee as addNewInspectionFeeApi,
  updateInspectionFee as updateInspectionFeeApi,
  deleteInspectionFee as deleteInspectionFeeApi,
} from "../../helpers/backend_helper";

export const getInspectionFees = createAsyncThunk(
  "inspectionFee/getInspectionFees",
  async (params) => {
    try {
      const response = await getInspectionFeesApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const addNewInspectionFee = createAsyncThunk(
  "inspectionFee/addNewInspectionFee",
  async (inspectionFee) => {
    try {
      const response = await addNewInspectionFeeApi(inspectionFee);
      toast.success("Inspection Fee Added Successfully", {
        autoClose: 3000,
      });

      return response;
    } catch (error) {
      toast.error("Inspection Fee Creation Failed", {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const updateInspectionFee = createAsyncThunk(
  "inspectionFee/updateInspectionFee",
  async (inspectionFee) => {
    try {
      const response = await updateInspectionFeeApi(inspectionFee);
      toast.success("Inspection Fee Updated Successfully", {
        autoClose: 3000,
      });
      const data = response;
      return data;
    } catch (error) {
      toast.error("Inspection Fee Update Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteInspectionFee = createAsyncThunk(
  "inspectionFee/deleteInspectionFee",
  async (inspectionFee) => {
    try {
      const response = await deleteInspectionFeeApi(inspectionFee);
      toast.success("Inspection Fee Deleted Successfully", {
        autoClose: 3000,
      });
      return { inspectionFee, ...response };
    } catch (error) {
      toast.error("Inspection Fee Deletion Failed", {
        autoClose: 3000,
      });
      return error;
    }
  }
);
