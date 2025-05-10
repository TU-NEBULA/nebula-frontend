import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
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

      try {
        const { data } = await api.get("/oauth/reissue", {
          withCredentials: true,
        });

        await chrome.cookies.set({
          url: baseURL,
          name: "accessToken",
          value: data.result.accessToken,
          path: "/",
          httpOnly: true,
        });

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
