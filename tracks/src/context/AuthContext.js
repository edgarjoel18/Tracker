import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_ERROR_MESSAGE":
      return { ...state, errorMessage: "" };
    case "SIGN_IN":
      return { errorMessage: "", token: action.payload };
    case "ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload };
    case "SIGN_OUT":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

// this is similar to redux thunk
const signup = (dispatch) => {
  return async ({ email, password }) => {
    // make api requests
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "SIGN_IN", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "ERROR_MESSAGE",
        payload: "Something went wrong when signing in",
      });
    }
    // if successful we need to change state
  };
};

const signout = (dispatch) => {
  return async () => {
    // signout
    await AsyncStorage.removeItem("token");
    dispatch({ type: "SIGN_OUT" });
    navigate("loginFlow");
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    // make api requests
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "SIGN_IN", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "ERROR_MESSAGE",
        payload: "Something went wrong with Sign in",
      });
    }
    // if successful we need to change state
  };
};

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "CLEAR_ERROR_MESSAGE" });
  };
};

const tryLocalSignin = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "SIGN_IN", payload: token });
      navigate("TrackList");
    } else {
      navigate("Signup");
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
