import { Endpoint } from "../endpoint.service";
import { axiosReq } from "../axios.service";

export const StatsService = {
  getStats(params) {
    return axiosReq.get(Endpoint.stats.list, { params });
  },
};
