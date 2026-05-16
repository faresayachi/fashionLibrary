import axiosInstance from './axiosInstance';

export function registerRequest(payload) {
  return axiosInstance.post('/auth/register', payload);
}

export function loginRequest(payload) {
  return axiosInstance.post('/auth/login', payload);
}

export function refreshRequest(refreshToken) {
  return axiosInstance.post('/auth/refresh', { refreshToken }, { _skipRefresh: true });
}

export function logoutRequest() {
  return axiosInstance.post('/auth/logout');
}

export function meRequest() {
  return axiosInstance.get('/auth/me');
}
