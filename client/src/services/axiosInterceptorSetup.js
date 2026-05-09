import axiosInstance, { setAccessToken } from './axiosInstance';
import { refreshRequest } from './authService';

let requestInterceptorId = null;
let responseInterceptorId = null;

export function setupAxiosInterceptors({ getAccessToken, getRefreshToken, saveAccessToken, logout }) {
  if (requestInterceptorId !== null) {
    axiosInstance.interceptors.request.eject(requestInterceptorId);
  }
  if (responseInterceptorId !== null) {
    axiosInstance.interceptors.response.eject(responseInterceptorId);
  }

  requestInterceptorId = axiosInstance.interceptors.request.use(
    (config) => {
      const token = getAccessToken?.();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  responseInterceptorId = axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error?.config;
      const status = error?.response?.status;

      if (status !== 401 || !originalRequest || originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const refreshTokenValue = getRefreshToken?.();
        if (!refreshTokenValue) throw error;

        const response = await refreshRequest(refreshTokenValue);
        const newAccessToken = response?.data?.data?.accessToken;
        if (!newAccessToken) throw error;

        saveAccessToken?.(newAccessToken);
        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        logout?.();
        return Promise.reject(refreshError);
      }
    }
  );
}
