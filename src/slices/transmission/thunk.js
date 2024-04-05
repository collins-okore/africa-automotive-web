import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import { getTransmissions as getTransmissionsApi } from "../../helpers/backend_helper";

export const getTransmissions = createAsyncThunk(
  "vehicleTransmission/getTransmissions",
  async (params) => {
    try {
      const response = await getTransmissionsApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);
