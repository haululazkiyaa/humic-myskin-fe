import { useEffect, useState } from "react";

import { DoctorService } from "../../services/doctor/doctor.services";
import TanstackDaftarPasien from "../../components/table/TanstackDaftarPasien";

const DaftarPasien = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await DoctorService.getPatients();
        setPatients(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError("Failed to fetch patients data");
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="py-10 px-6">
        <h1 className="text-3xl font-bold text-black text-center">
          Daftar Pasien
        </h1>
        <div className="py-10 px-6 flex justify-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 px-6">
        <h1 className="text-3xl font-bold text-black text-center">
          Daftar Pasien
        </h1>
        <div className="py-10 px-6 flex justify-center">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-6">
      <h1 className="text-3xl font-bold text-black text-center">
        Daftar Pasien
      </h1>
      <div className="px-6 flex justify-center">
        <TanstackDaftarPasien data={patients} />
      </div>
    </div>
  );
};

export default DaftarPasien;
