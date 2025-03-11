import PropTypes from "prop-types";
// import { X } from "lucide-react";

const LoginForm = ({ onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg w-[1200px] flex overflow-hidden p-5">
      {/* Left Image Section */}
      <div className="w-1/2">
        <img
          src="/src/assets/img/doctor.jpeg"
          alt="Doctor"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-[#12476B] text-white px-3 py-1 rounded-full"
        >
          {/* <X size={24} /> */}x
        </button>
        <h2 className="text-[26px] font-bold text-center">Masuk</h2>
        <p className="text-[#646464] text-center mb-6">
          Masuk untuk tetap terhubung
        </p>

        <form className="space-y-4">
          <div className="space-y-4">
            <label className=" size-[14px] font-bold">Email</label>
            <input
              type="email"
              placeholder="Masukkan email kamu"
              className="w-full p-3 border rounded-[16px] mt-1 border-[#B8B8B8]"
            />
          </div>

          <div className="space-y-4">
            <label className=" size-[14px] font-bold">Kata Sandi</label>
            <input
              type="password"
              placeholder="Masukkan kata sandi kamu"
              className="w-full p-3 border rounded-[16px] mt-1 border-[#B8B8B8]"
            />
          </div>

          <div className="flex items-center justify-between mb-4 text-[#646464]">
            <div>
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <a href="#" className="text-[#2699E8]">
              Lupa Kata Sandi?
            </a>
          </div>

          <button className="w-full bg-[#12476B] text-white py-3 rounded-full">
            Masuk
          </button>
        </form>

        <p className="text-[12px] text-[#646464] text-center mt-4">
          Email harus mengandung salah satu dari domain berikut:
          <span className="text-[#2699E8]"> @pasien.myskin.ac.id </span>
          untuk login sebagai pasien, atau
          <span className="text-[#2699E8]"> @dokter.myskin.ac.id </span>
          untuk login sebagai dokter.
        </p>

        <p className="text-[12px] text-center text-[#646464] mt-2">
          Belum memiliki akun?{" "}
          <a href="#" className="text-[#2699E8]">
            Klik disini untuk daftar
          </a>
        </p>
      </div>
    </div>
  );
};
LoginForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default LoginForm;
