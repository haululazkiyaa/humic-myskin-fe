import PropTypes from "prop-types";
import bannerDoctor from "../../../assets/img/doctorImage.jpg";
import { useState } from "react";
import PageForm1 from "./PageForm1";
import PageForm2 from "./PageForm2";
import { AuthService } from "../../../services/auth/auth.service";

const AuthFormDoctor = ({ onClose, onBackToLogin }) => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (dataFromPage1) => {
    setFormData((prev) => ({ ...prev, ...dataFromPage1 }));
    setPage(2);
  };

  const handleSubmit = async (dataFromPage2) => {
    const finalData = new FormData();
    finalData.append("name", formData.name);
    finalData.append("email", formData.email);
    finalData.append("phone", formData.phone);
    finalData.append("password", formData.password);
    finalData.append("password_confirmation", formData.password_confirmation);
    finalData.append("practice_address", formData.practice_address);
    finalData.append("specialization", dataFromPage2.specialist);
    finalData.append("license_number", dataFromPage2.registrationNumber);
    finalData.append("license_file", dataFromPage2.licenseFile);
    finalData.append("diploma_file", dataFromPage2.medicalDegreeFile);
    finalData.append("certification_file", dataFromPage2.certificationFile);
    finalData.append("current_institution", dataFromPage2.currentInstitution);
    finalData.append("work_history", dataFromPage2.workHistory);
    finalData.append("publications", dataFromPage2.publications || "");

    try {
      await AuthService.registerDoctor(finalData);
      alert("Pendaftaran berhasil!");
      onClose();
    } catch (error) {
      console.error("Gagal mendaftar:", error);
      alert("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg w-[1200px] flex flex-col lg:flex-row overflow-hidden p-5 max-h-[90%] mx-4 lg:mx-0">
      {/* Left Image Section */}
      <div className="w-full lg:w-1/2">
        <img
          src={bannerDoctor}
          alt="Doctor"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 p-8 lg:relative overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 lg:top-0 lg:right-0 bg-[#12476B] text-white px-3 py-1 rounded-full cursor-pointer"
        >
          x
        </button>

        <h2 className="text-[26px] font-bold text-center">
          {page === 1 ? "Daftar Dokter" : "Profil Dokter Spesialis"}
        </h2>
        <p className="text-[#646464] text-center mb-6">
          {page === 1
            ? "Buat akun Dokter Anda"
            : "Detail Profesional dan Dokumen Pendukung"}
        </p>

        <div>
          {page === 1 && (
            <PageForm1 onNext={handleNext} onDotClick={() => setPage(2)} />
          )}
          {page === 2 && (
            <PageForm2
              onBack={() => setPage(1)}
              onSubmit={handleSubmit}
              onDotClick={() => setPage(1)}
            />
          )}
        </div>

        <p className="text-[12px] text-[#646464] text-center mt-4">
          Email harus mengandung salah satu dari domain berikut:
          <span className="text-[#2699E8]"> @pasien.myskin.ac.id </span>
          untuk mendaftar sebagai pasien, atau
          <span className="text-[#2699E8]"> @dokter.myskin.ac.id </span>
          untuk mendaftar sebagai dokter.
        </p>
        <p className="text-[12px] text-center text-[#646464] mt-2">
          Sudah memiliki akun?{" "}
          <button
            href="#"
            className="text-[#2699E8] inline cursor-pointer"
            onClick={onBackToLogin}
          >
            Masuk
          </button>
        </p>
      </div>
    </div>
  );
};

AuthFormDoctor.propTypes = {
  onClose: PropTypes.func.isRequired,
  onBackToLogin: PropTypes.func.isRequired,
};

export default AuthFormDoctor;
