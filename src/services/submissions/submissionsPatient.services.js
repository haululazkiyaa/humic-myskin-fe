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
    updateDetection(id, data) {
        return axiosReq.put(`${Endpoint.detectionsPatient.update}/${id}`, data);
    },
    deleteDetection(id) {
        return axiosReq.delete(`${Endpoint.detectionsPatient.delete}/${id}`);
    },
    
    // Pengajuan Pasien
    getSubmissions(params) {
        return axiosReq.get(Endpoint.submissionsPatient.history, { params });
    },
    getSubmissionsById(id){
        return axiosReq.get(`${Endpoint.submissionsPatient.detail}/${id}`);
    },
    deleteSubmission(id) {
        return axiosReq.delete(`${Endpoint.submissionsPatient.delete}/${id}`);
    },
};