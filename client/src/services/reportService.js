import axiosInstance from './axiosInstance';

export function getReports(params = {}) {
  return axiosInstance.get('/reports', { params });
}

export function getReportById(id) {
  return axiosInstance.get(`/reports/${id}`);
}

export function getMyLibrary() {
  return axiosInstance.get('/reports/my-library');
}

export function createReport(formData) {
  return axiosInstance.post('/reports', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

export function updateReport(id, formData) {
  return axiosInstance.put(`/reports/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

export function deleteReport(id) {
  return axiosInstance.delete(`/reports/${id}`);
}
