import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
}

const SERVER_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/api\/?$/, '');
export function getAssetUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${SERVER_BASE}${path}`;
}

export default axiosInstance;
