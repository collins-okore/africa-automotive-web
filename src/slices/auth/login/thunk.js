//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
  getProfile,
  deleteToken,
} from "../../../helpers/backend_helper";

import {
  loginSuccess,
  logoutUserSuccess,
  apiError,
  reset_login_flag,
} from "./reducer";

// const fireBaseBackend = getFirebaseBackend();

export const loginUser = (user, history) => async (dispatch) => {
  try {
    let response;

    response = postJwtLogin({
      identifier: user.email,
      password: user.password,
    });

    var data = await response;

    if (data) {
      let authData = {
        token: data?.jwt,
        userId: data?.user?.id,
        email: data?.user?.email,
        username: data?.user?.username,
      };

      sessionStorage.setItem("authUser", JSON.stringify(authData));

      let profileData = await getProfile({ populate: "role" });

      authData = {
        ...authData,
        firstName: profileData.firstName,
        otherNames: profileData.otherNames,
        role: profileData?.role?.name,
      };

      sessionStorage.setItem("authUser", JSON.stringify(authData));

      if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
        dispatch(loginSuccess(authData));
        history("/dashboard");
      }
    } else {
      dispatch(apiError(data));
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const fetchUserProfile = (userId) => async (dispatch) => {};

export const logoutUser = () => async (dispatch) => {
  try {
    sessionStorage.removeItem("authUser");
    let fireBaseBackend = getFirebaseBackend();
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(logoutUserSuccess(response));
    } else {
      dispatch(logoutUserSuccess(true));
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const socialLogin = (type, history) => async (dispatch) => {
  try {
    let response;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      response = fireBaseBackend.socialLoginUser(type);
    }
    //  else {
    //   response = postSocialLogin(data);
    // }

    const socialdata = await response;
    if (socialdata) {
      sessionStorage.setItem("authUser", JSON.stringify(response));
      dispatch(loginSuccess(response));
      history("/dashboard");
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};
