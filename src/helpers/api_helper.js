import axios from "axios";
import qs from "qs";
import { api } from "../config";
import { POST_JWT_LOGIN } from "./url_helper";

// default
axios.defaults.baseURL = api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// content type

axios.interceptors.request.use(
  (config) => {
    if (config.url == POST_JWT_LOGIN) {
      config.headers.Authorization = null;
      return config;
    }

    const token = JSON.parse(sessionStorage.getItem("authUser"))
      ? JSON.parse(sessionStorage.getItem("authUser")).token
      : null;

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      case 403:
        message = "You do not have permissions to access this resource";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url, params) => {
    let response;

    // let paramKeys = [];

    if (params) {
      //   Object.keys(params).map((key) => {
      //     paramKeys.push(key + "=" + params[key]);
      //     return paramKeys;
      //   });

      //   const queryString =
      //     paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      const queryString = qs.stringify(params);

      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  create = (url, data, params) => {
    if (params) {
      const queryString = qs.stringify(params);
      return axios.post(`${url}?${queryString}`, data);
    }
    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.put(url, data);
  };

  put = (url, data) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };
}
const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };
