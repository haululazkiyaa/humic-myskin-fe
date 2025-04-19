import { Endpoint } from "../endpoint.service";
import { axiosReq } from "../axios.service";

export const AuthService = {
  register(data) {
    return axiosReq.post(Endpoint.auth.register, data);
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
