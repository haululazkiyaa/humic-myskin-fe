import { useEffect, useState } from "react";

import AuthForm from "../../components/form/AuthForm";
import ListNavbar from "../../components/ListNavbar";
import useModal from "../../hooks/useModal";

const Navbar = () => {
  const { Modal, onOpen, onClose } = useModal();
  const [user, setUser] = useState(null);

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
    <div className="w-full flex justify-center pt-5 absolute">
      <div className="w-6xl flex justify-between items-center px-12 py-5 rounded-xl shadow-md bg-white/60 backdrop-blur-sm">
        <h1 className="font-semibold text-md text-blue-950">MySkin</h1>
        <div className="flex gap-x-4">
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
          <div className="flex gap-x-4">
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
