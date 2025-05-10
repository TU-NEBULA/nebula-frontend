import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL_V2;

export const apiV2 = axios.create({
  baseURL,
  withCredentials: true,
});

apiV2.interceptors.response.use(
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
        const { data } = await apiV2.get("/oauth/reissue", {
          withCredentials: true,
        });

        await chrome.cookies.set({
          url: baseURL,
          name: "accessToken",
          value: data.result.accessToken,
          path: "/",
          httpOnly: true,
        });

        return apiV2(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
