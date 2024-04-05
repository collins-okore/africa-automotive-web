import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import { getFuelTypes as getFuelTypesApi } from "../../helpers/backend_helper";

export const getFuelTypes = createAsyncThunk(
  "vehicleFuelType/getFuelTypes",
  async (params) => {
    try {
      const response = await getFuelTypesApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);
