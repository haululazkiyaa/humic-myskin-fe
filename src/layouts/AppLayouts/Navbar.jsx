import ListNavbar from "../../components/ListNavbar";
import LoginForm from "../../components/form/LoginForm";
import useModal from "../../hooks/useModal";

const Navbar = () => {
  const { Modal, onOpen, onClose } = useModal();

  return (
    <div className="w-full flex justify-center pt-5 absolute">
      <div className="w-6xl flex justify-between items-center px-12 py-5 rounded-xl shadow-md bg-white/60 backdrop-blur-sm">
        <h1 className="font-semibold text-md text-blue-950">MySkin</h1>
        <div className="flex gap-x-4">
          <ListNavbar to="/">Beranda</ListNavbar>
          {/* {role === "pasien" && (
            <span>
              <ListNavbar to="/deteksi-pasien">Riwayat Deteksi</ListNavbar>
              <ListNavbar to="/pengajuan-pasien">Riwayat Pengajuan</ListNavbar>
            </span>
          )} */}
          <ListNavbar to="/faq">FAQ</ListNavbar>
        </div>
        <button
          onClick={onOpen}
          className="font-extralight text-md cursor-pointer"
        >
          Masuk
        </button>
      </div>
      <Modal>
        <LoginForm onClose={onClose} />
      </Modal>
    </div>
  );
};

export default Navbar;
