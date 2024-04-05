import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getVehicleBodyColors as getVehicleBodyColorsApi,
  addNewVehicleBodyColor as addNewVehicleBodyColorApi,
  updateVehicleBodyColor as updateVehicleBodyColorApi,
  deleteVehicleBodyColor as deleteVehicleBodyColorApi,
} from "../../helpers/backend_helper";

export const getVehicleBodyColors = createAsyncThunk(
  "vehicleBodyColor/getVehicleBodyColors",
  async (params) => {
    try {
      const response = await getVehicleBodyColorsApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const addNewVehicleBodyColor = createAsyncThunk(
  "vehicleBodyColor/addNewVehicleBodyColor",
  async (vehicleBodyColor) => {
    try {
      const response = await addNewVehicleBodyColorApi(vehicleBodyColor);
      toast.success("Vehicle Body Color Added Successfully", {
        autoClose: 3000,
      });

      return response;
    } catch (error) {
      toast.error("Vehicle Body Color Creation Failed", {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const updateVehicleBodyColor = createAsyncThunk(
  "vehicleBodyColor/updateVehicleBodyColor",
  async (vehicleBodyColor) => {
    try {
      const response = await updateVehicleBodyColorApi(vehicleBodyColor);
      toast.success("Vehicle Body Color Updated Successfully", {
        autoClose: 3000,
      });
      const data = response;
      return data;
    } catch (error) {
      toast.error("Vehicle Body Color Update Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteVehicleBodyColor = createAsyncThunk(
  "vehicleBodyColor/deleteVehicleBodyColor",
  async (vehicleBodyColor) => {
    try {
      const response = await deleteVehicleBodyColorApi(vehicleBodyColor);
      toast.success("Vehicle Body Color Deleted Successfully", {
        autoClose: 3000,
      });
      return { vehicleBodyColor, ...response };
    } catch (error) {
      toast.error("Vehicle Color Deletion Failed", { autoClose: 3000 });
      return error;
    }
  }
);
