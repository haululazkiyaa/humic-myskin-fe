import PropTypes from "prop-types";
import { useState } from "react";

const PageForm1 = ({ onNext, onDotClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    practiceAddress: "",
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

  const handleNextClick = (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      alert("Kata sandi harus terdiri dari minimal 8 karakter!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }

    const domain = formData.email.split("@")[1];
    if (domain !== "dokter.myskin.ac.id") {
      alert("Email harus dengan domain dokter.myskin.ac.id");
      return;
    }

    // Kirim data ke komponen utama
    onNext({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dob: null,
      password: formData.password,
      role: "doctor",
      password_confirmation: formData.confirmPassword,
      practice_address: formData.practiceAddress,
    });
  };

  return (
    <div className="max-w-md mx-auto px-2 py-4">
      <form className="space-y-4" onSubmit={handleNextClick}>
        <div>
          <label className="block font-semibold mb-1">Nama Lengkap</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama lengkap kamu"
            required
            className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email kamu"
              required
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">No. Telepon</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Masukkan nomor telepon kamu"
              required
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Kata Sandi</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan kata sandi"
              required
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Masukkan kembali kata sandi"
              required
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Alamat Praktik</label>
          <input
            type="text"
            name="practiceAddress"
            value={formData.practiceAddress}
            onChange={handleChange}
            placeholder="Masukkan alamat praktik"
            required
            className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1E3A5F] text-white font-semibold py-2 rounded-full hover:bg-[#1A2F4A] transition"
        >
          Next
        </button>

        <div className="flex justify-center mt-4 space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#1E3A5F]"></span>
          <span
            className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"
            onClick={onDotClick}
          ></span>
        </div>
      </form>
    </div>
  );
};

PageForm1.propTypes = {
  onNext: PropTypes.func.isRequired,
  onDotClick: PropTypes.func.isRequired,
};

export default PageForm1;
