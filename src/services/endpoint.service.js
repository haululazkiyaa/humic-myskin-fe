const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Endpoint = {
  auth: {
    registerDoctor: `${API_BASE_URL}/auth/register/doctor`,
    registerPatient: `${API_BASE_URL}/auth/register/patient`,
    login: `${API_BASE_URL}/auth/login`,
    refreshToken: `${API_BASE_URL}/auth/refresh-token`,
    logout: `${API_BASE_URL}/v1/auth/logout`,
  },
  submissions: {
    list: `${API_BASE_URL}/submissions`,
    detail: `${API_BASE_URL}/submissions`,
    create: `${API_BASE_URL}/submissions`,
    update: `${API_BASE_URL}/submissions`,
    delete: `${API_BASE_URL}/submissions`,
  },
  detectionsPatient: {
    history: `${API_BASE_URL}/patient/detections`,
    detail: `${API_BASE_URL}/patient/detections`,
    create: `${API_BASE_URL}/patient/detections`,
    update: `${API_BASE_URL}/patient/detections`,
    delete: `${API_BASE_URL}/patient/detections`,
  },
  submissionsPatient: {
    history: `${API_BASE_URL}/patient/submissions`,
    detail: `${API_BASE_URL}/patient/submissions`,
    delete: `${API_BASE_URL}/patient/submissions`,
  },
  accounts: {
    list: `${API_BASE_URL}/accounts`,
    detail: `${API_BASE_URL}/accounts`,
    create: `${API_BASE_URL}/accounts`,
    update: `${API_BASE_URL}/accounts`,
    delete: `${API_BASE_URL}/accounts`,
  },
  stats: {
    list: `${API_BASE_URL}/doctor/dashboard/stats`,
  },
  summary: {
    pending: `${API_BASE_URL}/doctor/dashboard/pending`,
    patient: `${API_BASE_URL}/doctor/patients`,
  },
  doctor: {
    doctorList: `${API_BASE_URL}/patient/doctors`,
  },
  doctor_services: {
    stats: `${API_BASE_URL}/doctor/dashboard/stats`,
    pending: `${API_BASE_URL}/doctor/dashboard/pending`,
    patients: `${API_BASE_URL}/doctor/patients`,
    submission: `${API_BASE_URL}/doctor/submissions/pending`,
    history: `${API_BASE_URL}/doctor/submissions/history`,
    detail: `${API_BASE_URL}/doctor/submissions/{id}/detail`,
    verify: `${API_BASE_URL}/doctor/submissions/{id}`,
  },
  // Add other namespaces and endpoints here as needed
};
