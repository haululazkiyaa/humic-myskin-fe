import { Endpoint } from "../endpoint.service";
import { axiosReq } from "../axios.service";

export const DoctorService = {
  getStats(params) {
    return axiosReq.get(Endpoint.doctor_services.stats, { params });
  },

  getPendingSubmissions(params) {
    return axiosReq.get(Endpoint.doctor_services.pending, { params });
  },

  getPatients(params) {
    return axiosReq.get(Endpoint.doctor_services.patients, { params });
  },

  getPendingSubmissionsList(params) {
    return axiosReq.get(Endpoint.doctor_services.submission, { params });
  },

  getSubmissionsHistory(params) {
    return axiosReq.get(Endpoint.doctor_services.history, { params });
  },

  getSubmissionDetail(id, params) {
    const url = Endpoint.doctor_services.detail.replace("{id}", id);
    return axiosReq.get(url, { params });
  },

  verifySubmission(id, data) {
    const url = Endpoint.doctor_services.verify.replace("{id}", id);
    return axiosReq.patch(url, data);
  },
};
