import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL_V2;

export const apiV2 = axios.create({
  baseURL,
  withCredentials: true,
});
