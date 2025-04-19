import { FaBarsStaggered, FaPeopleGroup } from "react-icons/fa6";
import { FaFileAlt, FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import AuthForm from "../../components/form/AuthForm";
import ListNavbar from "../../components/ListNavbar";
import useModal from "../../hooks/useModal";

const Navbar = () => {
  const { Modal, onClose } = useModal();
  const location = useLocation();
  const [url, setUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2] || "dashboard";
    setUrl(currentPath);
    setIsOpen(false);
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
      to: "/dokter/daftar-pasien",
      label: "Daftar Pasien",
      icon: <FaPeopleGroup size={20} />,
      key: "daftar-pasien",
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
    <div className="w-full flex justify-center mb-[60px] lg:mb-0">
      {/* navbar mobile */}
      <div className="fixed w-full z-[20] bg-white">
        <div className="flex lg:hidden w-full justify-between items-center px-6 py-5 border-b-[1px] border-[#E3E3E3]">
          <div onClick={() => setIsOpen(!isOpen)}>
            <FaBarsStaggered />
          </div>
          <h1 className="flex md:hidden font-bold mx-auto pr-[18px] text-lg text-blue-950">
            MySkin
          </h1>
        </div>
        {isOpen && (
          <div className="absolute top-17 left-0 w-full flex flex-col items-center p-5 gap-y-5 shadow-lg bg-white">
            {menuItems.map((item) => (
              <ListNavbar key={item.key} to={item.to}>
                {item.label}
              </ListNavbar>
            ))}
            <button
              onClick={handleLogout}
              className="font-extralight text-md cursor-pointer text-red-500"
            >
              Keluar
            </button>
          </div>
        )}
      </div>

      {/* navbar desktop */}
      <div className="hidden lg:flex w-full justify-between items-center px-12 py-5 border-b-[1px] border-[#E3E3E3] bg-white/60 backdrop-blur-sm">
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
