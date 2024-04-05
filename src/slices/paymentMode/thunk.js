import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import { getPaymentModes as getPaymentModesApi } from "../../helpers/backend_helper";

export const getPaymentModes = createAsyncThunk(
  "paymentMode/getPaymentModes",
  async (params) => {
    try {
      const response = await getPaymentModesApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);
