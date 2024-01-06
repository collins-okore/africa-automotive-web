import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getCurrencies as getCurrenciesApi,
  addNewCurrency as addNewCurrencyApi,
  updateCurrency as updateCurrencyApi,
  deleteCurrency as deleteCurrencyApi,
} from "../../helpers/backend_helper";

export const getCurrencies = createAsyncThunk(
  "currency/getCurrencies",
  async (params) => {
    try {
      const response = await getCurrenciesApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const addNewCurrency = createAsyncThunk(
  "currency/addNewCurrency",
  async (currency) => {
    try {
      const response = await addNewCurrencyApi(currency);
      toast.success("Currency Added Successfully", { autoClose: 3000 });

      return response;
    } catch (error) {
      toast.error("Currency Creation Failed", {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const updateCurrency = createAsyncThunk(
  "currency/updateCurrency",
  async (currency) => {
    try {
      const response = await updateCurrencyApi(currency);
      toast.success("Currency Updated Successfully", { autoClose: 3000 });
      const data = response;
      return data;
    } catch (error) {
      toast.error("Currency Update Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteCurrency = createAsyncThunk(
  "currency/deleteCurrency",
  async (currency) => {
    try {
      const response = await deleteCurrencyApi(currency);
      toast.success("Currency Deleted Successfully", { autoClose: 3000 });
      return { currency, ...response };
    } catch (error) {
      toast.error("Currency Deletion Failed", { autoClose: 3000 });
      return error;
    }
  }
);
