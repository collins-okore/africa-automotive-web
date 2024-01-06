import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getCountries as getCountriesApi,
  addNewCountry as addNewCountryApi,
  updateCountry as updateCountryApi,
  deleteCountry as deleteCountryApi,
} from "../../helpers/backend_helper";

export const getCountries = createAsyncThunk(
  "country/getCountries",
  async (params) => {
    try {
      const response = await getCountriesApi(params);
      return response;
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const addNewCountry = createAsyncThunk(
  "country/addNewCountry",
  async (country) => {
    try {
      const response = await addNewCountryApi(country);
      toast.success("Country Added Successfully", { autoClose: 3000 });

      return response;
    } catch (error) {
      toast.error("Country Creation Failed", {
        autoClose: 3000,
      });
      return error;
    }
  }
);

export const updateCountry = createAsyncThunk(
  "country/updateCountry",
  async (country) => {
    try {
      const response = await updateCountryApi(country);
      toast.success("Country Updated Successfully", { autoClose: 3000 });
      const data = response;
      return data;
    } catch (error) {
      toast.error("Country Update Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteCountry = createAsyncThunk(
  "country/deleteCountry",
  async (country) => {
    try {
      const response = await deleteCountryApi(country);
      toast.success("Country Deleted Successfully", { autoClose: 3000 });
      return { country, ...response };
    } catch (error) {
      toast.error("Country Deletion Failed", { autoClose: 3000 });
      return error;
    }
  }
);
