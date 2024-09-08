import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from "../types";
import { toast } from "react-toastify";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
} from "../../services/authService";

export const login = (email, password) => async (dispatch) => {
  try {
    const data = await loginService(email, password);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("userId", data._id);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    toast.success("Login successful!");
    return true;
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    toast.error(error.response.data.message);
    return false;
  }
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    const data = await registerService(username, email, password);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    toast.success("Registration successful!");
    return true;
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    toast.error(error.response.data.message);
    return false;
  }
};

export const logout = () => (dispatch) => {
  logoutService();
  dispatch({ type: LOGOUT });
  toast.success("Logged out successfully!");
};
