import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import { getPaymentTypes as getPaymentTypesApi } from "../../helpers/backend_helper";

export const getPaymentTypes = createAsyncThunk(
  "paymentType/getPaymentTypes",
  async (params) => {
    try {
      const response = await getPaymentTypesApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);
