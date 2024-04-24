import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data) =>
  api.create(url.POST_FAKE_REGISTER, data);

// Login Method
export const postFakeLogin = (data) => api.create(url.POST_FAKE_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = (data) =>
  api.create(url.POST_FAKE_PASSWORD_FORGET, data);

//Get profile
export const getProfile = (data) => api.get(url.GET_PROFILE, data);

// Edit profile
export const postJwtProfile = (data) =>
  api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data) =>
  api.update(url.POST_EDIT_PROFILE + "/" + data.idx, data);

// Register Method
export const postJwtRegister = (url, data) => {
  return api.create(url, data).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// Login Method
export const postJwtLogin = (data) => api.create(url.POST_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = (data) =>
  api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data) => api.create(url.SOCIAL_LOGIN, data);

/* Inspections */

export const getInspections = (params) => api.get(url.GET_INSPECTIONS, params);

export const addNewInspection = (payload) =>
  api.create(url.ADD_NEW_INSPECTION, payload);
export const getInspection = (inspectionId) =>
  api.get(url.GET_INSPECTION + "/" + inspectionId);
export const inspect = (payload) => api.create(url.INSPECT, payload);

export const updateInvoice = (invoice) =>
  api.update(url.UPDATE_INSPECTION + "/" + invoice._id, invoice);

export const deleteInvoice = (invoice) =>
  api.delete(url.DELETE_INSPECTION + "/" + invoice);

/* Vehicle Makes */

export const getVehicleMakes = (params) =>
  api.get(url.GET_VEHICLE_MAKES, params);

export const addNewVehicleMake = (payload) =>
  api.create(url.ADD_NEW_VEHICLE_MAKE, payload);

export const updateVehicleMake = (payload) =>
  api.update(url.UPDATE_VEHICLE_MAKE + "/" + payload.id, payload);

export const deleteVehicleMake = (payload) =>
  api.delete(url.DELETE_VEHICLE_MAKE + "/" + payload.id);

/* Vehicle Models */

export const getVehicleModels = (params) =>
  api.get(url.GET_VEHICLE_MODELS, params);

export const addNewVehicleModel = (payload) =>
  api.create(url.ADD_NEW_VEHICLE_MODEL, payload);

export const updateVehicleModel = (payload) =>
  api.update(url.UPDATE_VEHICLE_MODEL + "/" + payload.id, payload);

export const deleteVehicleModel = (payload) =>
  api.delete(url.DELETE_VEHICLE_MODEL + "/" + payload.id);

/* Vehicle Fuel Type */

export const getFuelTypes = (params) => api.get(url.GET_FUEL_TYPES, params);

/* Vehicle Body Color */

export const getVehicleBodyColors = (params) =>
  api.get(url.GET_VEHICLE_BODY_COLORS, params);

export const addNewVehicleBodyColor = (payload) =>
  api.create(url.ADD_NEW_VEHICLE_BODY_COLOR, payload);

export const updateVehicleBodyColor = (payload) =>
  api.update(url.UPDATE_VEHICLE_BODY_COLOR + "/" + payload.id, payload);

export const deleteVehicleBodyColor = (payload) =>
  api.delete(url.DELETE_VEHICLE_BODY_COLOR + "/" + payload.id);

/* Vehicle Body Type*/

export const getVehicleBodyTypes = (params) =>
  api.get(url.GET_VEHICLE_BODY_TYPES, params);

export const addNewVehicleBodyType = (payload) =>
  api.create(url.ADD_NEW_VEHICLE_BODY_TYPE, payload);

export const updateVehicleBodyType = (payload) =>
  api.update(url.UPDATE_VEHICLE_BODY_TYPE + "/" + payload.id, payload);

export const deleteVehicleBodyType = (payload) =>
  api.delete(url.DELETE_VEHICLE_BODY_TYPE + "/" + payload.id);

/* Inspection Fees */

export const getInspectionFees = (params) =>
  api.get(url.GET_INSPECTION_FEES, params);

export const addNewInspectionFee = (payload) =>
  api.create(url.ADD_NEW_INSPECTION_FEE, payload);

export const updateInspectionFee = (payload) =>
  api.update(url.UPDATE_INSPECTION_FEE + "/" + payload.id, payload);

export const deleteInspectionFee = (payload) =>
  api.delete(url.DELETE_INSPECTION_FEE + "/" + payload.id);

/* Currency */

export const getCurrencies = (params) => api.get(url.GET_CURRENCIES, params);

export const addNewCurrency = (payload) =>
  api.create(url.ADD_NEW_CURRENCY, payload);

export const updateCurrency = (payload) =>
  api.update(url.UPDATE_CURRENCY + "/" + payload.data.id, payload);

export const deleteCurrency = (payload) =>
  api.delete(url.DELETE_CURRENCY + "/" + payload.id);

/* Countries */

export const getCountries = (params) => api.get(url.GET_COUNTRIES, params);

export const addNewCountry = (payload) =>
  api.create(url.ADD_NEW_COUNTRY, payload);

export const updateCountry = (payload) =>
  api.update(url.UPDATE_CURRENCY + "/" + payload.data.id, payload);

export const deleteCountry = (payload) =>
  api.delete(url.DELETE_CURRENCY + "/" + payload.id);

/* Client */

export const getClients = (params) => api.get(url.GET_CLIENTS, params);

export const getClient = (params) => api.get(url.GET_CLIENT, params);

export const addNewClient = (payload, params) =>
  api.create(url.ADD_NEW_CLIENT, payload, params);

export const updateClient = (payload) =>
  api.update(url.UPDATE_CLIENT + "/" + payload.id, payload);

export const deleteClient = (payload) =>
  api.delete(url.DELETE_CLIENT + "/" + payload.id);

/* Payment Mode */
export const getPaymentModes = (params) =>
  api.get(url.GET_PAYMENT_MODES, params);

/* Payment Type */
export const getPaymentTypes = (params) =>
  api.get(url.GET_PAYMENT_TYPES, params);

/* User */
export const getUsers = (params) => api.get(url.GET_USERS, params);

export const getUser = (params) => api.get(url.GET_USER, params);

export const addNewUser = (payload, params) =>
  api.create(url.ADD_NEW_USER, payload, params);

export const updateUser = (payload) =>
  api.update(url.UPDATE_USER + "/" + payload.data.id, payload);

/* Transmission */
export const getTransmissions = (params) =>
  api.get(url.GET_TRANSMISSIONS, params);

/* Payments */

export const getPayments = (params) => api.get(url.GET_PAYMENTS, params);

export const addNewPayment = (payload) =>
  api.create(url.ADD_NEW_PAYMENT, payload);

export const updatePayment = (payload) =>
  api.update(url.UPDATE_PAYMENT + "/" + payload.id, payload);

/* Banks */

export const getBanks = (params) => api.get(url.GET_BANKS, params);

export const addNewBank = (payload) => api.create(url.ADD_NEW_BANK, payload);

export const updateBank = (payload) =>
  api.update(url.UPDATE_BANK + "/" + payload.id, payload);

// Dashboard Ecommerce
// Revenue
export const getAllRevenueData = () => api.get(url.GET_ALLREVENUE_DATA);
export const getMonthRevenueData = () => api.get(url.GET_MONTHREVENUE_DATA);
export const getHalfYearRevenueData = () =>
  api.get(url.GET_HALFYEARREVENUE_DATA);
export const getYearRevenueData = () => api.get(url.GET_YEARREVENUE_DATA);

//API Key
export const getAPIKey = () => api.get(url.GET_API_KEY);
