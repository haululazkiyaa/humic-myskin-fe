import { FaCheckCircle, FaClock, FaFileAlt, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";

import { DoctorService } from "../../services/doctor/doctor.services";
import { FaArrowRight } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";

const DashboardDokter = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalPatients: 0,
    pending: 0,
    verified: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await DoctorService.getStats();
        setStats(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setError("Failed to load statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Format current date for display
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("id-ID", options);

  return (
    <div className="p-6">
      <h2 className="text-[28px]">Hi, {user?.data?.name}</h2>
      <h3 className="text-[16px] text-[#646464]">{formattedDate}</h3>

      {loading ? (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="space-y-2 p-5 rounded-lg shadow-xl bg-white border border-[#f7f7f7] animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Card
            title="Pasien"
            count={stats.totalPatients || "-"}
            icon={<FaUser />}
          />
          <Card
            title="Menunggu Verifikasi"
            count={stats.pending || "-"}
            icon={<FaClock />}
          />
          <Card
            title="Terverifikasi"
            count={stats.verified || "-"}
            icon={<FaCheckCircle />}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-6">
        <div className="lg:col-span-7">
          <VerificationTable />
        </div>
        <div className="lg:col-span-5">
          <PatientsTable />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, count, icon }) => {
  return (
    <div className="space-y-2 p-5 rounded-lg shadow-xl bg-white border border-[#f7f7f7]">
      <p className="text-[16px] text-gray-500">{title}</p>
      <div className="flex items-center gap-4 ">
        <div className="text-2xl border border-[#E3E3E3] rounded-full p-3">
          {icon}
        </div>
        <p className="text-xl font-bold text-[20px]">{count}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.element.isRequired,
};

const VerificationTable = () => {
  const [pendingSummaries, setPendingSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingSummary = async () => {
      try {
        setLoading(true);
        const response = await DoctorService.getPendingSubmissions({
          limit: 5,
        });
        setPendingSummaries(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch pending summaries:", err);
        setError(
          "Failed to load verification requests. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPendingSummary();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div>
      <h2 className="lg:hidden font-bold text-[24px]">Ajuan Verifikasi</h2>

      <div className="p-5 rounded-lg shadow-xl bg-white border border-[#f7f7f7]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="hidden lg:block font-bold text-[30px]">
            Ajuan Verifikasi
          </h2>
          <a
            href="/dokter/daftar-pengajuan"
            className="text-[#12476B] flex items-center gap-2 text-[16px] font-bold"
          >
            Lihat semua <FaArrowRight />
          </a>
        </div>
        <hr className="hidden lg:block border border-[#E3E3E3]" />

        {loading ? (
          <div className="animate-pulse space-y-4 mt-5">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="h-12 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        ) : error ? (
          <div className="mt-5 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        ) : pendingSummaries.length === 0 ? (
          <div className="mt-5 text-center py-8 text-gray-500">
            Tidak ada ajuan verifikasi saat ini
          </div>
        ) : (
          <table className="w-full mt-5">
            <thead>
              <tr>
                <th className="text-[16px] py-4">Tanggal</th>
                <th className="text-[16px] py-4">Pasien</th>
                <th className="text-[16px] py-4">Diagnosis AI</th>
                <th className="text-[16px] py-4">Verifikasi</th>
              </tr>
            </thead>
            <tbody>
              {pendingSummaries.map((summary) => (
                <tr key={summary.id}>
                  <td className="text-[16px] py-2 text-center">
                    {summary.submittedAt
                      ? formatDate(summary.submittedAt)
                      : "-"}
                  </td>
                  <td className="text-[16px] py-2 text-center">
                    {summary.patientName || "-"}
                  </td>
                  <td className="text-[16px] py-2 text-center text-[#C11616]">
                    {summary.diagnosisAi || "-"}
                  </td>
                  <td className="text-[16px] py-2 text-center">
                    <button
                      className="w-full bg-[#12476B] text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2"
                      onClick={() =>
                        (window.location.href = `/dokter/riwayat-verifikasi/informasi-penyakit/${summary.id}`)
                      }
                    >
                      <FaFileAlt /> Verifikasi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const PatientsTable = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await DoctorService.getPatients({ limit: 5 });
        setPatients(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch patient data:", err);
        setError("Failed to load patient data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h2 className="lg:hidden font-bold mb-3 text-[24px]">Pasien</h2>
      <div className="p-5 rounded-lg shadow-xl bg-white border border-[#f7f7f7]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="hidden lg:block font-bold mb-3 text-[30px]">Pasien</h2>
          <a
            href="/dokter/daftar-pasien"
            className="text-[#12476B] flex items-center gap-2 text-[16px] font-bold"
          >
            Lihat semua <FaArrowRight />
          </a>
        </div>
        <hr className="hidden lg:block border border-[#E3E3E3]" />

        {loading ? (
          <div className="animate-pulse space-y-4 mt-5">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="h-12 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        ) : error ? (
          <div className="mt-5 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        ) : patients.length === 0 ? (
          <div className="mt-5 text-center py-8 text-gray-500">
            Tidak ada data pasien saat ini
          </div>
        ) : (
          <table className="w-full mt-5">
            <thead>
              <tr>
                <th className="text-[16px] py-4">Nama</th>
                <th className="text-[16px] py-4">Nomor Telepon</th>
                <th className="text-[16px] py-4">Jumlah Ajuan</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr
                  key={patient.id || index}
                  className={`text-[16px] py-2 text-center ${
                    index % 2 === 0 ? "bg-[#F6F4F4]" : ""
                  }`}
                >
                  <td className="py-2">{patient.name || "-"}</td>
                  <td className="py-2">{patient.phone || "-"}</td>
                  <td className="py-2">{patient.submissionCount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardDokter;
