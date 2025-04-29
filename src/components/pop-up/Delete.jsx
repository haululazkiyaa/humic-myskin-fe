import PropTypes from "prop-types";
import deleteBtn from "../../assets/icon/delete-button.png"
const Delete = ({ onClose, onDelete }) => {
  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <div className="bg-white w-96 p-6 rounded-xl shadow-lg relative">
          {/* Header */}
          <div className="flex justify-between items-center gap-2 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2">
              <img src={deleteBtn} alt="" />
              <h2 className="text-lg font-semibold text-gray-700">
                Hapus Hasil Deteksi
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-red-500 cursor-pointer"
            >
              ✖
            </button>
          </div>

          <div className="my-2">
            <p className="text-sm font-normal">Apakah kamu yakin ingin menghapus hasil deteksi?</p>
          </div>
  
          {/* Tombol Aksi */}
          <div onClick={onClose} className="w-full flex gap-x-1 mt-4">
            <button
              className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Kembali
            </button>
            <button onClick={onDelete} className="w-1/2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer">
              <span className="flex justify-center items-center gap-2">
                <img src={deleteBtn} alt="" />
                Hapus
              </span>
            </button>
          </div>
        </div>
      </div>
    );
}

Delete.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

export default Delete