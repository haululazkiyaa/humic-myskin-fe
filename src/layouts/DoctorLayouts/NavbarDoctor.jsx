import { FaFileAlt, FaHome } from "react-icons/fa";

import AuthForm from "../../components/form/AuthForm";
import { Link } from "react-router-dom";
import useModal from "../../hooks/useModal";
import { useState } from "react";

const Navbar = () => {
  const { Modal, onClose } = useModal();
  const [active, setActive] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex justify-between items-center px-12 py-5 border-b-[1px] border-[#E3E3E3] bg-white/60 backdrop-blur-sm">
        <h1 className="font-semibold text-md text-blue-950">MySkin</h1>
        <div className="flex gap-x-6 items-center">
          <Link
            to="/dokter"
            className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
              active === "dashboard" ? "bg-blue-900 text-white" : "text-black"
            }`}
            onClick={() => setActive("dashboard")}
          >
            <FaHome size={20} /> Dashboard
          </Link>
          <Link
            to="/daftar-pengajuan"
            className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
              active === "daftar-pengajuan" ? "bg-gray-200" : "text-black"
            }`}
            onClick={() => setActive("daftar-pengajuan")}
          >
            <FaFileAlt size={20} /> Daftar Pengajuan
          </Link>
          <Link
            to="/riwayat-verifikasi"
            className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
              active === "riwayat-verifikasi" ? "bg-gray-200" : "text-black"
            }`}
            onClick={() => setActive("riwayat-verifikasi")}
          >
            <FaFileAlt size={20} /> Riwayat Verifikasi
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="font-extralight text-md text-red-600 cursor-pointer"
        >
          Keluar
        </button>
      </div>
      <Modal>
        <AuthForm onClose={onClose} />
      </Modal>
    </div>
  );
};

export default Navbar;
