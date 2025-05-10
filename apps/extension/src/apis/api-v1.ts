import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const apiV1 = axios.create({
  baseURL,
  withCredentials: true,
});

apiV1.interceptors.response.use(
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
        const { data } = await apiV1.get("/oauth/reissue", {
          withCredentials: true,
        });

        await chrome.cookies.set({
          url: baseURL,
          name: "accessToken",
          value: data.result.accessToken,
          path: "/",
          httpOnly: true,
        });

        return apiV1(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
