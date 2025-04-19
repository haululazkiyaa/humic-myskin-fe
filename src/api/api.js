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

export const registerUser = async (name, email, phone, dob, password, role, password_confirmation) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, {
      name, email, phone, dob, password, role, password_confirmation
    })

    console.log("Registrasi berhasil: ", res.data);
  } catch (error) {
    console.error("Registrasi gagal:", error.res?.data || error.message);
    throw error;
  }
}

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email, password
    });

    console.log("Login berhasil: ", response.data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login gagal:", error.response?.data || error.message);
    throw error;
  }
}