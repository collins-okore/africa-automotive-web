import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getVehicleMakes as getVehicleMakesApi,
  addNewVehicleMake as addNewVehicleMakeApi,
  updateVehicleMake as updateVehicleMakeApi,
  deleteVehicleMake as deleteVehicleMakeApi,
} from "../../helpers/backend_helper";

export const getVehicleMakes = createAsyncThunk(
  "vehicleMake/getVehicleMakes",
  async (params) => {
    try {
      const response = await getVehicleMakesApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const addNewVehicleMake = createAsyncThunk(
  "vehicleMake/addNewVehicleMake",
  async (vehicleMake) => {
    try {
      const response = await addNewVehicleMakeApi(vehicleMake);
      toast.success("Vehicle Make Added Successfully", { autoClose: 3000 });

      return response;
    } catch (error) {
      toast.error("Vehicle Make Creation Failed", {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const updateVehicleMake = createAsyncThunk(
  "vehicleMake/updateVehicleMake",
  async (vehicleMake) => {
    try {
      const response = await updateVehicleMakeApi(vehicleMake);
      toast.success("Vehicle Make Updated Successfully", { autoClose: 3000 });
      const data = response;
      return data;
    } catch (error) {
      toast.error("Vehicle Make Update Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteVehicleMake = createAsyncThunk(
  "vehicleMake/deleteVehicleMake",
  async (vehicleMake) => {
    try {
      const response = await deleteVehicleMakeApi(vehicleMake);
      toast.success("Vehicle Make Deleted Successfully", { autoClose: 3000 });
      return { vehicleMake, ...response };
    } catch (error) {
      toast.error("Vehicle Make Deletion Failed", { autoClose: 3000 });
      return error;
    }
  }
);
