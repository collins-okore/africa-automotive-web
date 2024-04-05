import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getVehicleModels as getVehicleModelsApi,
  addNewVehicleModel as addNewVehicleModelApi,
  updateVehicleModel as updateVehicleModelApi,
  deleteVehicleModel as deleteVehicleModelApi,
} from "../../helpers/backend_helper";

export const getVehicleModels = createAsyncThunk(
  "vehicleModel/getVehicleModels",
  async (params) => {
    try {
      const response = await getVehicleModelsApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const addNewVehicleModel = createAsyncThunk(
  "vehicleModel/addNewVehicleModel",
  async (vehicleModel) => {
    try {
      const response = await addNewVehicleModelApi(vehicleModel);
      toast.success("Vehicle Model Added Successfully", { autoClose: 3000 });

      return response;
    } catch (error) {
      toast.error("Vehicle Model Creation Failed", {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const updateVehicleModel = createAsyncThunk(
  "vehicleModel/updateVehicleModel",
  async (vehicleModel) => {
    try {
      const response = await updateVehicleModelApi(vehicleModel);
      toast.success("Vehicle Model Updated Successfully", { autoClose: 3000 });
      const data = response;
      return data;
    } catch (error) {
      toast.error("Vehicle Model Update Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteVehicleModel = createAsyncThunk(
  "vehicleModel/deleteVehicleModel",
  async (vehicleModel) => {
    try {
      const response = await deleteVehicleModelApi(vehicleModel);
      toast.success("Vehicle Model Deleted Successfully", { autoClose: 3000 });
      return { vehicleModel, ...response };
    } catch (error) {
      toast.error("Vehicle Model Deletion Failed", { autoClose: 3000 });
      return error;
    }
  }
);
