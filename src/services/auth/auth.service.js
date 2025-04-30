import { Endpoint } from "../endpoint.service";
import { axiosReq } from "../axios.service";

export const AuthService = {
  registerDoctor(data) {
    return axiosReq.post(Endpoint.auth.registerDoctor, data);
  },
  registerPatient(data) {
    return axiosReq.post(Endpoint.auth.registerPatient, data);
  },
  login(data) {
    return axiosReq.post(Endpoint.auth.login, data);
  },
  logout() {
    return axiosReq.post(Endpoint.auth.logout);
  },
  refreshToken() {
    return axiosReq.post(Endpoint.auth.refreshToken);
  },
};
