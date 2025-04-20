import { Endpoint } from "../endpoint.service";
import { axiosReq } from "../axios.service";

export const AccountsService = {
  getAccounts(params) {
    return axiosReq.get(Endpoint.accounts.list, { params });
  },
  getAccountById(id) {
    return axiosReq.get(`${Endpoint.accounts.detail}/${id}`);
  },
  createAccount(data) {
    return axiosReq.post(Endpoint.accounts.create, data);
  },
  updateAccount(id, data) {
    return axiosReq.put(`${Endpoint.accounts.update}/${id}`, data);
  },
  deleteAccount(id) {
    return axiosReq.delete(`${Endpoint.accounts.delete}/${id}`);
  },
};
