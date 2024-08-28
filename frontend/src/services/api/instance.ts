import axios from "axios";
import { storage } from "./storage";

const url = "http://localhost:3000";

const axiosClient = axios.create({ baseURL: url });

axiosClient.interceptors.request.use(config => {
  config.headers["Authorization"] = `Bearer ${storage.getToken()}`;
  return config;
});

export const client = {
  post: axiosClient.post,
  get: axiosClient.get,
  put: axiosClient.put,
  patch: axiosClient.patch,
  delete: axiosClient.delete,
};
