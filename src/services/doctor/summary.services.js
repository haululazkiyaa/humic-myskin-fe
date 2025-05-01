import { Endpoint } from "../endpoint.service";
import { axiosReq } from "../axios.service";

export const SummaryService = {
  getPendingSummary(params) {
    return axiosReq.get(Endpoint.summary.pending, { params });
  },
  getPatientSummary(params) {
    return axiosReq.get(Endpoint.summary.patient, { params });
  },
};
