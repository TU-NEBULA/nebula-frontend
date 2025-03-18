import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const storage = await chrome.storage.local.get();
  console.log(storage);

  if (storage.accessToken) {
    config.headers.Authorization = `Bearer ${storage.accessToken}`;
  }

  return config;
});
