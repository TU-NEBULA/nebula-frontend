import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const storage = await chrome.storage.local.get();
  if (storage.accessToken) {
    config.headers.Authorization = `Bearer ${storage.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.data &&
      error.response.data.code === "TOKEN4001" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const storage = await chrome.storage.local.get();
      const refreshToken = storage.refreshToken;

      if (refreshToken) {
        try {
          const { data } = await api.get("/oauth/reissue", {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          await chrome.storage.local.set(data);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);
