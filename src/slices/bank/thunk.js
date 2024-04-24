import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getBanks as getBanksApi,
  addNewBank as addNewBankApi,
  updateBank as updateBankApi,
} from "../../helpers/backend_helper";

export const getBanks = createAsyncThunk("bank/getBanks", async (params) => {
  try {
    console.log("calling getBanksApi");
    const response = await getBanksApi(params);
    console.log("Response", response);
    return response;
  } catch (error) {
    toast.error(error, {
      autoClose: 3000,
    });
    return error;
  }
});

export const addNewBank = createAsyncThunk("bank/addNewBank", async (bank) => {
  try {
    const response = await addNewBankApi(bank);
    toast.success("Bank Added Successfully", { autoClose: 3000 });

    return response;
  } catch (error) {
    toast.error("Bank Creation Failed", {
      autoClose: 3000,
    });
    return error;
  }
});

export const updateBank = createAsyncThunk("bank/updateBank", async (bank) => {
  try {
    const response = await updateBankApi(bank);
    toast.success("Bank Updated Successfully", { autoClose: 3000 });
    const data = response;
    return data;
  } catch (error) {
    toast.error("Bank Update Failed", { autoClose: 3000 });
    return error;
  }
});

// export const deleteBank = createAsyncThunk("bank/deleteBank", async (bank) => {
//   try {
//     const response = await deleteBankApi(bank);
//     toast.success("Bank Deleted Successfully", { autoClose: 3000 });
//     return { bank, ...response };
//   } catch (error) {
//     toast.error("Bank Deletion Failed", { autoClose: 3000 });
//     return error;
//   }
// });
