import { Endpoint } from "../endpoint.service";
import { axiosReq } from "../axios.service";

export const SubmissionsPatientService = {
  // Deteksi Pasien
  getDetections(params) {
    return axiosReq.get(Endpoint.detectionsPatient.history, { params });
  },
  getDetectionsById(id) {
    return axiosReq.get(`${Endpoint.detectionsPatient.detail}/${id}`);
  },
  createDetection: (formData) => {
    return axiosReq.post(`${Endpoint.detectionsPatient.create}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateDetection: async (id, data, token) => {
    return axiosReq.patch(`${Endpoint.detectionsPatient.update}/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteDetection(id) {
    return axiosReq.delete(`${Endpoint.detectionsPatient.delete}/${id}`);
  },

  // Pengajuan Pasien
  getSubmissions(params) {
    return axiosReq.get(Endpoint.submissionsPatient.history, { params });
  },
  getSubmissionsById(id) {
    return axiosReq.get(`${Endpoint.submissionsPatient.detail}/${id}`);
  },
  deleteSubmission(id) {
    return axiosReq.delete(`${Endpoint.submissionsPatient.delete}/${id}`);
  },

  // Doctor list
  getListDoctors(params) {
    return axiosReq.get(Endpoint.doctor.doctorList, { params });
  },
};
