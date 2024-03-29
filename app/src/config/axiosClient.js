import AsyncStorage from "@react-native-async-storage/async-storage";
import authApi from "@src/api/auth";
import { UrlAPI } from "@src/constants";
import axios from "axios";
import { SERVER_API_KEY } from "@env";

const baseURL = UrlAPI;

const axiosClient = axios.create({
  baseURL,
});
axiosClient.interceptors.request.use(
  async (config) => {
    config.headers["x-api-key"] = SERVER_API_KEY;
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `${JSON.parse(token)}`;
    }
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      config.headers["x-client-id"] = JSON.parse(userId);
    }

    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (refreshToken) {
        await authApi.logout();
        return Promise.reject();
      }
      const refreshResult = await axiosClient.post("/api/auth/refresh-token", {
        refreshToken: JSON.parse(refreshToken),
      });
      if (refreshResult.data) {
        await AsyncStorage.setItem(
          "token",
          JSON.stringify(refreshResult.data.accessToken)
        );
        // retry the initial query with new token
        originalRequest.headers["Authorization"] =
          refreshResult.data.accessToken;
        return axiosClient(originalRequest);
      } else {
        await authApi.logout();
        return Promise.reject();
      }
    }
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //refresh token failed
    return Promise.reject(error);
  }
);

export default axiosClient;
