import { Endpoint } from "../endpoint.service";
import { axiosReq } from "../axios.service";

export const SubmissionsService = {
  getSubmissions(params) {
    return axiosReq.get(Endpoint.submissions.list, { params });
  },
  getSubmissionById(id) {
    return axiosReq.get(`${Endpoint.submissions.detail}/${id}`);
  },
  createSubmission(data) {
    return axiosReq.post(Endpoint.submissions.create, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  updateSubmission(id, data) {
    return axiosReq.put(`${Endpoint.submissions.update}/${id}`, data);
  },
  deleteSubmission(id) {
    return axiosReq.delete(`${Endpoint.submissions.delete}/${id}`);
  },
};
