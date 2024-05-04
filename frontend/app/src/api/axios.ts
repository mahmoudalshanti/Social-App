import axios from "axios";
const BASE_URL = "http://localhost:7000";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosUpload = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
