import PropTypes from "prop-types";
import { useState } from "react";

const PageForm2 = ({ onSubmit, onDotClick }) => {
  const [dataForm, setDataForm] = useState({
    specialist: "",
    registrationNumber: "",
    licenseFile: null,
    medicalDegreeFile: null,
    certificationFile: null,
    currentInstitution: "",
    workHistory: "",
    publications: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setDataForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setDataForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setDataForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dataForm.agree) {
      alert("Harap menyetujui persyaratan penggunaan.");
      return;
    }
    onSubmit(dataForm); 
  };

  return (
    <div className="max-w-md mx-auto px-2 py-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Spesialisasi</label>
            <select
              name="specialist"
              value={dataForm.specialist}
              onChange={handleChange}
              className="w-full rounded-full border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Pilih spesialisasi kamu</option>
              <option value="kulit">Dokter Spesialis Kulit</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Nomor Registrasi Dokter
            </label>
            <input
              type="text"
              name="registrationNumber"
              value={dataForm.registrationNumber}
              onChange={handleChange}
              placeholder="Masukkan nomor registrasi dokter"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Surat Tanda Registrasi
          </label>
          <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
            <input
              type="file"
              name="licenseFile"
              onChange={handleChange}
              className="flex-1 px-4 py-2 text-sm"
              required
            />
          </div>
        </div>

        <div className="w-full flex items-center space-x-2">
          <div className="w-1/2">
            <label className="font-semibold mb-1">Ijazah Kedokteran</label>
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
              <input
                type="file"
                name="medicalDegreeFile"
                onChange={handleChange}
                className="w-2/3 flex-1 px-4 py-2 text-sm"
                required
              />
            </div>
          </div>
          <div className="w-1/2">
            <label className="font-semibold mb-1">
              Sertifikat Keahlian (opsional)
            </label>
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
              <input
                type="file"
                name="certificationFile"
                onChange={handleChange}
                className="w-2/3 flex-1 px-4 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Institusi Kerja</label>
            <input
              type="text"
              name="currentInstitution"
              value={dataForm.currentInstitution}
              onChange={handleChange}
              placeholder="Masukkan institusi"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Pengalaman Kerja</label>
            <input
              type="text"
              name="workHistory"
              value={dataForm.workHistory}
              onChange={handleChange}
              placeholder="Masukkan pengalaman kerja"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Publikasi Ilmiah (opsional)
          </label>
          <input
            type="text"
            name="publications"
            value={dataForm.publications}
            onChange={handleChange}
            placeholder="Masukkan publikasi ilmiah"
            className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            name="agree"
            checked={dataForm.agree}
            onChange={handleChange}
            className="accent-[#1E3A5F]"
            required
          />
          <label htmlFor="terms" className="text-sm">
            Saya setuju dengan persyaratan penggunaan
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1E3A5F] text-white font-semibold py-2 rounded-full hover:bg-[#1A2F4A] transition"
        >
          Daftar
        </button>

        <div className="flex justify-center mt-4 space-x-2">
          <span
            className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"
            onClick={onDotClick}
          ></span>
          <span className="w-3 h-3 rounded-full bg-[#1E3A5F]"></span>
        </div>
      </form>
    </div>
  );
};

PageForm2.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDotClick: PropTypes.func.isRequired,
};

export default PageForm2;
