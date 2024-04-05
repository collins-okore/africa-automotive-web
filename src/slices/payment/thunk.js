import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getPayments as getPaymentsApi,
  addNewPayment as addNewPaymentApi,
  updatePayment as updatePaymentApi,
} from "../../helpers/backend_helper";

export const getPayments = createAsyncThunk(
  "payment/getPayments",
  async (params) => {
    try {
      const response = await getPaymentsApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const addNewPayment = createAsyncThunk(
  "payment/addNewPayment",
  async (payment) => {
    try {
      const response = await addNewPaymentApi(payment);
      toast.success("Payment Added Successfully", { autoClose: 3000 });

      return response;
    } catch (error) {
      toast.error("Payment Creation Failed", {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const updatePayment = createAsyncThunk(
  "payment/updatePayment",
  async (payment) => {
    try {
      const response = await updatePaymentApi(payment);
      toast.success("Payment Updated Successfully", { autoClose: 3000 });
      const data = response;
      return data;
    } catch (error) {
      toast.error("Payment Update Failed", { autoClose: 3000 });
      return error;
    }
  }
);
