import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://bc9d-2601-640-8200-52e0-3db2-2ffb-9363-fb9e.ngrok.io",
});

// before making a axios call, run this function first
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
