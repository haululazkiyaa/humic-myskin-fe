import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getDaftarPengajuan = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/submissions`);
    return response.data.data;
  } catch (err) {
    console.error("Fetch error:", err.message);
    throw err;
  }
};

export const getDetailPengajuan = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/submissions/${id}`);
    return response.data.data;
  } catch (err) {
    console.error("Fetch error:", err.message);
    throw err;
  }
};