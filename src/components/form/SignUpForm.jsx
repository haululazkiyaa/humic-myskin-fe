import PropTypes from "prop-types";
import { useState } from "react";

// import { registerUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth/auth.service";

const SignUpForm = ({ onOpenDoctorForm }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
    role: "",
    confirmPassword: "",
    agree: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }

    if (!formData.agree) {
      alert("Harap setujui persyaratan penggunaan.");
      return;
    }

    const domain = formData.email.split("@")[1];
    if (domain !== "pasien.myskin.ac.id" && domain !== "dokter.myskin.ac.id") {
      alert("Email harus menggunakan domain yang valid!");
      return;
    }

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    const payload = {
      name: fullName,
      email: formData.email,
      phone: formData.phone,
      dob: formData.birthDate,
      password: formData.password,
      role: "patient",
      password_confirmation: formData.confirmPassword,
    };

    try {
      setIsLoading(true);
      await AuthService.registerPatient(payload);
      alert("Pendaftaran berhasil!");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDate: "",
        role: "",
        password: "",
        confirmPassword: "",
        agree: false,
      });

      navigate("/");
    } catch (error) {
      alert("Pendaftaran gagal. keterangan: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="Nama depan kamu"
          value={formData.firstName}
          onChange={handleChange}
          className="w-1/2 p-3 border rounded-[16px] mt-1 border-[#B8B8B8] text-black"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nama belakang kamu"
          value={formData.lastName}
          onChange={handleChange}
          className="w-1/2 p-3 border rounded-[16px] mt-1 border-[#B8B8B8] text-black"
        />
      </div>

      <div className="flex gap-4">
        <input
          type="email"
          name="email"
          placeholder="Masukkan email kamu"
          value={formData.email}
          onChange={handleChange}
          className="w-1/2 p-3 border rounded-[16px] mt-1 border-[#B8B8B8] text-black"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Masukkan nomor telepon kamu"
          value={formData.phone}
          onChange={handleChange}
          className="w-1/2 p-3 border rounded-[16px] mt-1 border-[#B8B8B8] text-black"
        />
      </div>

      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
        className="w-full p-3 border rounded-[16px] mt-1 border-[#B8B8B8] text-black"
      />

      <div className="flex gap-4">
        <input
          type="password"
          name="password"
          placeholder="Masukkan kata sandi"
          value={formData.password}
          onChange={handleChange}
          className="w-1/2 p-3 border rounded-[16px] mt-1 border-[#B8B8B8] text-black"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Masukkan kembali kata sandi"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-1/2 p-3 border rounded-[16px] mt-1 border-[#B8B8B8] text-black"
        />
      </div>

      <div className="flex items-center mb-4 text-[#646464]">
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          className="mr-2"
        />
        <label>Saya setuju dengan persyaratan penggunaan</label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#12476B] text-white font-bold py-3 rounded-full cursor-pointer"
      >
        {isLoading ? "Memproses..." : "Daftar"}
      </button>

      <p className="text-center text-gray-400">Atau</p>

      <button
        type="button"
        onClick={onOpenDoctorForm}
        className="w-full border border-[#12476B] text-[#12476B] font-bold py-3 rounded-full cursor-pointer"
      >
        Daftar sebagai Dokter
      </button>
    </form>
  );
};

SignUpForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpenDoctorForm: PropTypes.func.isRequired,
};

export default SignUpForm;
