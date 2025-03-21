import { useEffect, useState } from "react";

import AuthForm from "../../components/form/AuthForm";
import ListNavbar from "../../components/ListNavbar";
import useModal from "../../hooks/useModal";
import { FaBarsStaggered } from "react-icons/fa6";

const Navbar = () => {
  const { Modal, onOpen, onClose } = useModal();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <div className="fixed w-full flex justify-center lg:pt-5 absolute z-50">
      <div className="relative w-full lg:w-6xl flex md:justify-between items-center px-12 py-5 lg:rounded-xl shadow-md bg-white/60 backdrop-blur-sm">
        {/* navbar mobile */}
        <div onClick={() => setIsOpen(!isOpen)} className="md:hidden flex">
          <FaBarsStaggered />
        </div>
        <h1 className="flex md:hidden font-bold mx-auto text-lg text-blue-950">
          MySkin
        </h1>
        {isOpen && (
          <div className="absolute top-17 left-0 w-full bg-white/70 backdrop-blur-sm flex flex-col items-center p-5 gap-y-5 shadow-lg">
            <ListNavbar to="/">Beranda</ListNavbar>
            {user && user.role === "pasien" && (
              <>
                <ListNavbar to="deteksi">Riwayat Deteksi</ListNavbar>
                <ListNavbar to="pengajuan">Riwayat Pengajuan</ListNavbar>
              </>
            )}
            <ListNavbar to="/faq">FAQ</ListNavbar>
            {!user ? (
              <div className="w-full flex flex-col gap-y-5">
                <button className="font-semibold text-sky-900 text-md cursor-pointer">
                  Daftar
                </button>
                <button
                  onClick={onOpen}
                  className="bg-sky-800 px-4 py-2 rounded-lg font-extralight text-white text-md cursor-pointer"
                >
                  Masuk
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="font-extralight text-md cursor-pointer text-red-500"
              >
                Keluar
              </button>
            )}
          </div>
        )}
        <h1 className="hidden md:flex font-bold text-md text-blue-950">
          MySkin
        </h1>

        {/* navbar laptop */}
        <div className="flex gap-x-4 hidden md:flex">
          <ListNavbar to="/">Beranda</ListNavbar>
          {user && user.role === "pasien" && (
            <>
              <ListNavbar to="deteksi">Riwayat Deteksi</ListNavbar>
              <ListNavbar to="pengajuan">Riwayat Pengajuan</ListNavbar>
            </>
          )}
          <ListNavbar to="/faq">FAQ</ListNavbar>
        </div>

        {!user ? (
          <div className="hidden md:flex gap-x-4">
            <button className=" font-extralight text-sky-900 text-md cursor-pointer">
              Daftar
            </button>
            <button
              onClick={onOpen}
              className="bg-sky-800 px-4 py-2 rounded-lg font-extralight text-white text-md cursor-pointer"
            >
              Masuk
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="font-extralight text-md cursor-pointer text-red-500"
          >
            Keluar
          </button>
        )}
      </div>
      <Modal>
        <AuthForm onClose={onClose} />
      </Modal>
    </div>
  );
};

export default Navbar;
