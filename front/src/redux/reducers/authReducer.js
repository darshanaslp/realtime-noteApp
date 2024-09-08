import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from "../types";

const initialState = {
  userInfo: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, userInfo: action.payload, error: null };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return { ...state, error: action.payload };
    case LOGOUT:
      return { ...state, userInfo: null, error: null };
    default:
      return state;
  }
};

export default authReducer;
