import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const apiV1 = axios.create({
  baseURL,
  withCredentials: true,
});
