import LoginForm from "./LoginForm";
import PropTypes from "prop-types";
import SignUpForm from "./SignUpForm";
import banner from "../../assets/img/doctor.jpeg";
import { useState } from "react";

const AuthForm = ({ onClose, showLogin }) => {
  const [showForm, setShowForm] = useState(showLogin || "login");

  return (
    <div className="bg-white rounded-lg shadow-lg w-[1200px] flex overflow-hidden p-5 max-h-[90%]">
      {/* Left Image Section */}
      <div className="w-1/2">
        <img
          src={banner}
          alt="Doctor"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 p-8 relative overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-[#12476B] text-white px-3 py-1 rounded-full cursor-pointer"
        >
          x
        </button>

        <h2 className="text-[26px] font-bold text-center">
          {" "}
          {showForm === "login" ? "Masuk" : "Daftar"}
        </h2>
        <p className="text-[#646464] text-center mb-6">
          {showForm === "login"
            ? "Masuk untuk tetap terhubung"
            : "Buat akun Anda"}
        </p>

        {showForm === "login" ? <LoginForm /> : <SignUpForm />}

        <p className="text-[12px] text-[#646464] text-center mt-4">
          Email harus mengandung salah satu dari domain berikut:
          <span className="text-[#2699E8]"> @pasien.myskin.ac.id </span>
          untuk {showForm === "login" ? "masuk" : "mendaftar"} sebagai pasien,
          atau
          <span className="text-[#2699E8]"> @dokter.myskin.ac.id </span>
          untuk {showForm === "login" ? "masuk" : "mendaftar"} sebagai dokter.
        </p>

        {showForm === "login" ? (
          <p className="text-[12px] text-center text-[#646464] mt-2">
            Belum memiliki akun?{" "}
            <button
              href="#"
              className="text-[#2699E8] inline cursor-pointer"
              onClick={() => setShowForm("register")}
            >
              Klik disini untuk daftar
            </button>
          </p>
        ) : (
          <p className="text-[12px] text-center text-[#646464] mt-2">
            Sudah memiliki akun?{" "}
            <button
              href="#"
              className="text-[#2699E8] inline cursor-pointer"
              onClick={() => setShowForm("login")}
            >
              Masuk
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  showLogin: PropTypes.string,
};

export default AuthForm;
