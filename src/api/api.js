const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getDaftarPengajuan = async () => {
  try {
    const response = await fetch(`${BASE_URL}/submissions`);
    if (!response.ok) {
      throw new Error("error fetching data");
    }
    const result = await response.json();
    console.log(result.data);
    return result.data; 
  } catch (err) {
    console.error("Fetch error:", err.message);
    throw err;
  }
};
