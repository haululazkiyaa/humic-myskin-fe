import { useEffect, useState } from "react";

import { DoctorService } from "../../services/doctor/doctor.services";
import TanstackDaftarPasien from "../../components/table/TanstackDaftarPasien";

const SkeletonTable = () => (
  <div className="py-10 w-full">
    <h1 className="text-3xl font-bold text-black text-center mb-6">
      Daftar Pasien
    </h1>

    {/* Filter dan Pencarian */}
    <div className="w-full mt-8 mb-5 rounded-xl shadow-lg bg-white p-6 overflow-auto border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="w-36 h-10 bg-gray-200 rounded animate-pulse" />
        <div className="w-72 h-10 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Header Table */}
      <div className="grid grid-cols-3 font-semibold text-black py-3 border-b border-gray-300">
        <div className="h-6 w-32" />
        <div className="h-6 w-40" />
        <div className="h-6 w-28" />
      </div>

      {/* Skeleton rows */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-3 gap-4 py-4 border-b border-gray-100 animate-pulse"
        >
          <div className="h-6 bg-gray-200 rounded w-32" />
          <div className="h-6 bg-gray-200 rounded w-40" />
          <div className="h-6 bg-gray-200 rounded w-24" />
        </div>
      ))}

      {/* Pagination Placeholder */}
      <div className="flex justify-between items-center mt-6">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

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
      <div className="flex px-6 justify-center">
        <SkeletonTable />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 px-6">
        <h1 className="text-3xl font-bold text-black text-center">
          Daftar Pasien
        </h1>
        <div className="py-10 flex justify-center">
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
      <div className="flex justify-center">
        {patients.length === 0 ? (
          <div className="w-full flex flex-col items-center py-10">
            <img
              src="/empty-state.svg"
              alt="Empty"
              className="w-40 h-40 mb-4 opacity-70"
              style={{ objectFit: "contain" }}
              onError={(e) => (e.target.style.display = "none")}
            />
            <p className="text-lg text-gray-500">
              Belum ada pasien yang terdaftar.
            </p>
          </div>
        ) : (
          <TanstackDaftarPasien data={patients} />
        )}
      </div>
    </div>
  );
};

export default DaftarPasien;
