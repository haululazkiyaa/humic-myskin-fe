import PropTypes from "prop-types";
import { useState } from "react";
import { AuthService } from "../../../services/auth/auth.service";

const PageForm2 = ({  onDotClick, formDataPage1 }) => {
  const [dataForm, setDataForm] = useState({
    specialization: "",
    license_number: "",
    current_institution: "",
    work_history: "",
    publications: "",
    agree: false,
  });
  const [files, setFiles] = useState({
    license_file: null,
    diploma_file: null,
    certification_file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files: fileList } = e.target;

    if (type === "checkbox") {
      setDataForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = fileList[0];
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (file && allowedTypes.includes(file.type)) {
        setFiles((prev) => ({ ...prev, [name]: file }));
      } else {
        alert("File harus berupa PDF, JPG, atau PNG.");
      }
    } else {
      setDataForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataForm.agree) {
      alert("Harap menyetujui persyaratan penggunaan.");
      return;
    }

    const formData = new FormData();

    // Data dari PageForm1
    formData.append("name", formDataPage1.name);
    formData.append("email", formDataPage1.email);
    formData.append("phone", formDataPage1.phone);
    formData.append("password", formDataPage1.password);
    formData.append(
      "password_confirmation",
      formDataPage1.password_confirmation
    );
    formData.append("practice_address", formDataPage1.practice_address);

    // Data dari PageForm2
    formData.append("specialization", dataForm.specialization);
    formData.append("license_number", dataForm.license_number);
    formData.append("current_institution", dataForm.current_institution);
    formData.append("work_history", dataForm.work_history);
    formData.append("publications", dataForm.publications || "");

    if (files.license_file) {
      formData.append("license_file", files.license_file);
    }
    if (files.diploma_file) {
      formData.append("diploma_file", files.diploma_file);
    }
    if (files.certification_file) {
      formData.append("certification_file", files.certification_file);
    }

    try {
      await AuthService.registerDoctor(formData);
      alert("Pendaftaran berhasil!");
      
      // Reset form setelah berhasil
      setDataForm({
        specialization: "",
        license_number: "",
        current_institution: "",
        work_history: "",
        publications: "",
        agree: false,
      });

      setFiles({
        license_file: null,
        diploma_file: null,
        certification_file: null,
      });
    } catch (error) {
      console.error("Gagal mendaftar:", error);
      alert("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-2 py-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Spesialisasi</label>
            <select
              name="specialization"
              value={dataForm.specialization}
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
              name="license_number"
              value={dataForm.license_number}
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
              name="license_file"
              onChange={handleChange}
              className="flex-1 px-4 py-2 text-sm"
              required
            />
          </div>
          {files.license_file && (
            <p className="text-green-600 text-sm mt-1">
              ✅ {files.license_file.name} berhasil diunggah
            </p>
          )}
        </div>

        <div className="w-full flex items-center space-x-2">
          <div className="w-1/2">
            <label className="font-semibold mb-1">Ijazah Kedokteran</label>
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
              <input
                type="file"
                name="diploma_file"
                onChange={handleChange}
                className="w-2/3 flex-1 px-4 py-2 text-sm"
                required
              />
            </div>
            {files.diploma_file && (
              <p className="text-green-600 text-sm mt-1">
                ✅ {files.diploma_file.name} berhasil diunggah
              </p>
            )}
          </div>
          <div className="w-1/2">
            <label className="font-semibold mb-1">
              Sertifikat Keahlian (opsional)
            </label>
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
              <input
                type="file"
                name="certification_file"
                onChange={handleChange}
                className="w-2/3 flex-1 px-4 py-2 text-sm"
              />
            </div>
            {files.certification_file && (
              <p className="text-green-600 text-sm mt-1">
                ✅ {files.certification_file.name} berhasil diunggah
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Institusi Kerja</label>
            <input
              type="text"
              name="current_institution"
              value={dataForm.current_institution}
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
              name="work_history"
              value={dataForm.work_history}
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
          onClick={handleSubmit}
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
  formDataPage1: PropTypes.object.isRequired,
};

export default PageForm2;
