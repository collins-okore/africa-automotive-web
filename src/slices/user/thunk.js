import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getUsers as getUsersApi,
  getUsers as getUserApi,
  addNewUser as addNewUserApi,
  updateUser as updateUserApi,
} from "../../helpers/backend_helper";

export const getUsers = createAsyncThunk("user/getUsers", async (params) => {
  try {
    const response = await getUsersApi(params);
    return response;
  } catch (error) {
    toast.error(error, {
      autoClose: 3000,
    });
    return error;
  }
});

export const getUser = createAsyncThunk("user/getUser", async (params) => {
  try {
    const response = await getUserApi(params);
    return response;
  } catch (error) {
    toast.error(error, {
      autoClose: 3000,
    });
    return error;
  }
});

export const addNewUser = createAsyncThunk("user/addNewUser", async (user) => {
  try {
    const response = await addNewUserApi(user);
    toast.success("Vehicle Model Added Successfully", { autoClose: 3000 });

    return response;
  } catch (error) {
    toast.error("Vehicle Model Creation Failed", {
      autoClose: 3000,
    });
    return error;
  }
});

export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  try {
    const response = await updateUserApi(user);
    toast.success("Vehicle Model Updated Successfully", { autoClose: 3000 });
    const data = response;
    return data;
  } catch (error) {
    toast.error("Vehicle Model Update Failed", { autoClose: 3000 });
    return error;
  }
});
