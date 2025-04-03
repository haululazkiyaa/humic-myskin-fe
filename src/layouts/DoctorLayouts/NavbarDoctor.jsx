import { FaFileAlt, FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import AuthForm from "../../components/form/AuthForm";
import useModal from "../../hooks/useModal";

const Navbar = () => {
  const { Modal, onClose } = useModal();
  const location = useLocation();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2] || "dashboard";
    setUrl(currentPath);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const menuItems = [
    {
      to: "/dokter",
      label: "Dashboard",
      icon: <FaHome size={20} />,
      key: "dashboard",
    },
    {
      to: "/dokter/daftar-pengajuan",
      label: "Daftar Pengajuan",
      icon: <FaFileAlt size={20} />,
      key: "daftar-pengajuan",
    },
    {
      to: "/dokter/riwayat-verifikasi",
      label: "Riwayat Verifikasi",
      icon: <FaFileAlt size={20} />,
      key: "riwayat-verifikasi",
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex justify-between items-center px-12 py-5 border-b-[1px] border-[#E3E3E3] bg-white/60 backdrop-blur-sm">
        <h1 className="font-semibold text-md text-blue-950">MySkin</h1>
        <div className="flex gap-x-12 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className={`flex items-center gap-2`}
            >
              <span
                className={`px-3 py-3 rounded-lg shadow transition-all duration-300 ${
                  url === item.key
                    ? "bg-[#12476B] text-white"
                    : "bg-white text-black"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`${
                  url === item.key ? "font-bold text-[#12476B]" : "text-black"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
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
