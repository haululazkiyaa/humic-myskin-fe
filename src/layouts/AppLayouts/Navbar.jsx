import ListNavbar from "../../components/ListNavbar";
import LoginForm from "../../components/form/LoginForm";
import useModal from "../../hooks/useModal";
import { useEffect, useState } from "react";

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
              <ListNavbar to="deteksi">Daftar Pengajuan</ListNavbar>
              <ListNavbar to="pengajuan">Riwayat Verifikasi</ListNavbar>
            </>
          )}
          <ListNavbar to="/faq">FAQ</ListNavbar>
        </div>
        {!user ? (
          <button
            onClick={onOpen}
            className="font-extralight text-md cursor-pointer"
          >
            Masuk
          </button>
        ) : (
          <button onClick={handleLogout} className="font-extralight text-md cursor-pointer text-red-500">
            Logout
          </button>
        )}
      </div>
      <Modal>
        <LoginForm onClose={onClose} />
      </Modal>
    </div>
  );
};

export default Navbar;
