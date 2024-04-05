import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getVehicleBodyTypes as getVehicleBodyTypesApi,
  addNewVehicleBodyType as addNewVehicleBodyTypeApi,
  updateVehicleBodyType as updateVehicleBodyTypeApi,
  deleteVehicleBodyType as deleteVehicleBodyTypeApi,
} from "../../helpers/backend_helper";

export const getVehicleBodyTypes = createAsyncThunk(
  "vehicleBodyType/getVehicleBodyTypes",
  async (params) => {
    try {
      const response = await getVehicleBodyTypesApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const addNewVehicleBodyType = createAsyncThunk(
  "vehicleBodyType/addNewVehicleBodyType",
  async (vehicleBodyType) => {
    try {
      const response = await addNewVehicleBodyTypeApi(vehicleBodyType);
      toast.success("Vehicle Body Type Added Successfully", {
        autoClose: 3000,
      });

      return response;
    } catch (error) {
      toast.error("Vehicle Body Type Creation Failed", {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const updateVehicleBodyType = createAsyncThunk(
  "vehicleBodyType/updateVehicleBodyType",
  async (vehicleBodyType) => {
    try {
      const response = await updateVehicleBodyTypeApi(vehicleBodyType);
      toast.success("Vehicle Body Type Updated Successfully", {
        autoClose: 3000,
      });
      const data = response;
      return data;
    } catch (error) {
      toast.error("Vehicle Body Type Update Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteVehicleBodyType = createAsyncThunk(
  "vehicleBodyType/deleteVehicleBodyType",
  async (vehicleBodyType) => {
    try {
      const response = await deleteVehicleBodyTypeApi(vehicleBodyType);
      toast.success("Vehicle Body Type Deleted Successfully", {
        autoClose: 3000,
      });
      return { vehicleBodyType, ...response };
    } catch (error) {
      toast.error("Vehicle Body Type Deletion Failed", { autoClose: 3000 });
      return error;
    }
  }
);
