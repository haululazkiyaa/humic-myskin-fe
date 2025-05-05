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
  createDetection(data) {
    return axiosReq.post(Endpoint.detectionsPatient.create, data);
  },
  updateDetection(id, data) {
    return axiosReq.patch(`${Endpoint.detectionsPatient.update}/${id}`, data);
  },
  deleteDetection(id) {
    return axiosReq.delete(`${Endpoint.detectionsPatient.delete}/${id}`);
  },

  // Pengajuan Pasien
  getSubmissions(params) {
    return axiosReq.get(Endpoint.submissionsPatient.history, { params });
  },
  patchSubmission(id, data) {
    return axiosReq.patch(`${Endpoint.submissionsPatient.update}/${id}`, data);
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
