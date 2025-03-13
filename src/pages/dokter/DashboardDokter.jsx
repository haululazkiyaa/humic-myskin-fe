import { FaCheckCircle, FaClock, FaFileAlt, FaUser } from "react-icons/fa";

import PropTypes from "prop-types";

const DashboardDokter = () => {
  return (
    <div className="p-6">
      <p className="text-gray-500">Minggu, 6 Oktober 2024</p>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card title="Pasien" count={547} icon={<FaUser />} />
        <Card title="Menunggu Verifikasi" count={547} icon={<FaClock />} />
        <Card title="Terferivikasi" count={547} icon={<FaCheckCircle />} />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <VerificationTable />
        <PatientsTable />
      </div>
    </div>
  );
};

const Card = ({ title, count, icon }) => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg shadow-md">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-xl font-bold">{count}</p>
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
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="font-bold mb-3">Ajuan Verifikasi</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left">Tanggal</th>
            <th className="text-left">Pasien</th>
            <th className="text-left">Diagnosis AI</th>
            <th>Verifikasi</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(3)].map((_, index) => (
            <tr key={index} className="border-b">
              <td>06/04/2024</td>
              <td>Muhammad Nur Shodiq</td>
              <td className="text-red-500">97.02% Melanoma</td>
              <td>
                <button className="bg-blue-900 text-white px-4 py-1 rounded flex items-center gap-2">
                  <FaFileAlt /> Verifikasi
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PatientsTable = () => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="font-bold mb-3">Pasien</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left">Nama</th>
            <th className="text-left">Nomor Telepon</th>
            <th className="text-left">Jumlah Ajuan</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Muhammad Nur Shodiq", phone: "082246881193", count: 1 },
            { name: "Naufal Zaki", phone: "081208120812", count: 2 },
            { name: "Muhammad Rakha", phone: "081081081081", count: 1 },
          ].map((patient, index) => (
            <tr key={index} className="border-b">
              <td>{patient.name}</td>
              <td>{patient.phone}</td>
              <td>{patient.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardDokter;
