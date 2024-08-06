import axios, { AxiosInstance, AxiosResponse } from "axios";
import queryClient from "./queryClient";
import { UNAUTHORIZED } from "../constants/http.mjs";
import { navigate } from "../lib/navigation";
const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};
const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  () => {}
);

const API: AxiosInstance = axios.create(options);

API.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T => response.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    if (status === UNAUTHORIZED && data?.errorCode === "InvalidAccessToken") {
      try {
        await TokenRefreshClient.get("/auth/refresh");
        return TokenRefreshClient(config);
      } catch (error) {
        queryClient.clear();
        navigate("/signin", {
          state: {
            redirectUrl: window.location.pathname,
          },
        });
      }
    }
    return Promise.reject({ status, ...data });
  }
);

export default API;
