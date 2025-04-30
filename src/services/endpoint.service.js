const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Endpoint = {
  auth: {
    registerDoctor: `${API_BASE_URL}/auth/register`,
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
  accounts: {
    list: `${API_BASE_URL}/accounts`,
    detail: `${API_BASE_URL}/accounts`,
    create: `${API_BASE_URL}/accounts`,
    update: `${API_BASE_URL}/accounts`,
    delete: `${API_BASE_URL}/accounts`,
  },
  // Add other namespaces and endpoints here as needed
};
