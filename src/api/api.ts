import axios from "axios";

export const expandHeaders = async () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  credentials: "include",
});

export const baseUrl = (url: string) => `${import.meta.env.VITE_API_URL}${url}`;

const axiosInstance = axios.create(); // Create an Axios instance

const refreshToken = async () => {
  try {
    const response = await axios.post(baseUrl("/auth/refresh"));
    const { accessToken } = response.data; // Adjust based on your response structure
    localStorage.setItem("token", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to login on failure
    throw error; // Re-throw error to be handled downstream
  }
};
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response && error.response.status === 403) || (error.response && error.response.status === 401)) {
      console.error("Access denied: You do not have permission to perform this action.");

      // Try to refresh the token
      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest); // Retry the original request with new token
      } catch (error) {
        console.error("Failed to refresh token:", error);
        localStorage.removeItem("token");
        window.location.href = "/"; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export const API = {
  get: (url: string, headers: object = {}, params: object = {}) => {
    return axiosInstance.get(url, {
      headers,
      params,
    });
  },
  put(url: string, headers = {}, data = {}) {
    return axiosInstance.put(url, data, {
      headers,
    });
  },
  post(url: string, headers = {}, data = {}) {
    return axiosInstance.post(url, data, {
      headers,
    });
  },
  delete(url: string, headers = {}) {
    return axiosInstance.delete(url, {
      headers,
    });
  },
};

// export const API = {
//     async login(payload: any) {
//         return axiosInstance.post(baseUrl("/auth/login"), {}, payload);
//     },
//     async registration(payload: any) {
//         return axiosInstance.post(baseUrl("/auth/registration"), {}, payload);
//     },
//     async me(user_id: string | null) {
//         return axiosInstance.get(baseUrl(`/auth/me/${user_id}`), await expandHeaders());
//     },
//     async getPhoto(user_id: string) {
//         return axiosInstance.get(baseUrl(`/auth/getPhoto/${user_id}`), await expandHeaders());
//     },
// };
