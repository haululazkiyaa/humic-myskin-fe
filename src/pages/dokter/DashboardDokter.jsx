import { FaCheckCircle, FaClock, FaFileAlt, FaUser } from "react-icons/fa";

import PropTypes from "prop-types";

const DashboardDokter = () => {
  return (
    <div className="p-6">
      <h2 className="text-[28px]">Hi, Muhammad</h2>
      <h3 className="text-[16px] text-[#646464]">Minggu, 6 Oktober 2024</h3>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card title="Pasien" count={547} icon={<FaUser />} />
        <Card title="Menunggu Verifikasi" count={547} icon={<FaClock />} />
        <Card title="Terferivikasi" count={547} icon={<FaCheckCircle />} />
      </div>
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
  return (
    <div>
      <h2 className="lg:hidden font-bold mb-3 text-[24px]">Ajuan Verifikasi</h2>
      <div className="p-5 rounded-lg shadow-xl bg-white border border-[#f7f7f7]">
        <h2 className="hidden lg:block font-bold mb-3 text-[30px]">
          Ajuan Verifikasi
        </h2>
        <hr className="hidden lg:block border border-[#E3E3E3]" />
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
            {[...Array(3)].map((_, index) => (
              <tr key={index}>
                <td className="text-[16px] py-2 text-center">06/04/2024</td>
                <td className="text-[16px] py-2 text-center">
                  Muhammad Nur Shodiq
                </td>
                <td className="text-[16px] py-2 text-center text-[#C11616]">
                  97.02% Melanoma
                </td>
                <td className="text-[16px] py-2 text-center">
                  <button className="w-full bg-[#12476B] text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2">
                    <FaFileAlt /> Verifikasi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PatientsTable = () => {
  return (
    <div>
      <h2 className="lg:hidden font-bold mb-3 text-[24px]">Pasien</h2>
      <div className="p-5 rounded-lg shadow-xl bg-white border border-[#f7f7f7]">
        <h2 className="hidden lg:block font-bold mb-3 text-[30px]">Pasien</h2>
        <hr className="hidden lg:block border border-[#E3E3E3]" />
        <table className="w-full mt-5">
          <thead>
            <tr>
              <th className="text-[16px] py-4">Nama</th>
              <th className="text-[16px] py-4">Nomor Telepon</th>
              <th className="text-[16px] py-4">Jumlah Ajuan</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Muhammad Nur Shodiq", phone: "082246881193", count: 1 },
              { name: "Naufal Zaki", phone: "081208120812", count: 2 },
              { name: "Muhammad Rakha", phone: "081081081081", count: 1 },
            ].map((patient, index) => (
              <tr
                key={index}
                className={`text-[16px] py-2 text-center ${
                  index % 2 === 0 ? "bg-[#F6F4F4]" : ""
                }`}
              >
                <td className="py-2">{patient.name}</td>
                <td className="py-2">{patient.phone}</td>
                <td className="py-2">{patient.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardDokter;
