import PropTypes from "prop-types";
import { useState } from "react";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
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

    alert("Pendaftaran berhasil!");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="Nama depan kamu"
          value={formData.firstName}
          onChange={handleChange}
          className="w-1/2 p-3 rounded-xl text-black"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nama belakang kamu"
          value={formData.lastName}
          onChange={handleChange}
          className="w-1/2 p-3 rounded-xl text-black"
        />
      </div>

      <div className="flex gap-4">
        <input
          type="email"
          name="email"
          placeholder="Masukkan email kamu"
          value={formData.email}
          onChange={handleChange}
          className="w-1/2 p-3 rounded-xl text-black"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Masukkan nomor telepon kamu"
          value={formData.phone}
          onChange={handleChange}
          className="w-1/2 p-3 rounded-xl text-black"
        />
      </div>

      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
        className="w-full p-3 rounded-xl text-black"
      />

      <div className="flex gap-4">
        <input
          type="password"
          name="password"
          placeholder="Masukkan kata sandi"
          value={formData.password}
          onChange={handleChange}
          className="w-1/2 p-3 rounded-xl text-black"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Masukkan kembali kata sandi"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-1/2 p-3 rounded-xl text-black"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          className="mr-2"
        />
        <label>Saya setuju dengan persyaratan penggunaan</label>
      </div>

      <button type="submit" className="w-full bg-blue-700 p-3 rounded-full">
        Daftar
      </button>

      <p className="text-center text-gray-400">Atau</p>

      <button
        type="button"
        className="w-full bg-white text-black p-3 rounded-full"
      >
        Daftar sebagai Dokter
      </button>
    </form>
  );
};

SignUpForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SignUpForm;
