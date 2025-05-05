import PropTypes from "prop-types";
import deleteBtn from "../../assets/icon/delete-button.png";
import editBtn from "../../assets/icon/edit-button.png";
import infoBtn from "../../assets/icon/info-btn.png";
import testImage from "../../assets/img/test-myskin.jpg";

const MTableDeteksi = ({ item, handleinfo, handleEdit, handleDelete, handleSubmission }) => {
  const percentValue = parseFloat(item.persentase);
  let textColor = "text-green-600";
  if (percentValue >= 50) {
    textColor = "text-red-600";
  }

  const statusColor =
    item.status === "rejected"
      ? "text-red-600"
      : item.status === "pending"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="block lg:hidden w-full mx-auto bg-white rounded-3xl shadow-lg p-6 mb-5">
      <div className="space-y-4">
        {/* Tanggal Pengajuan */}
        <div className="flex justify-between">
          <span className="font-bold">Tanggal Pengajuan</span>
          <span>{item.date}</span>
        </div>

        {/* Persentase */}
        <div className="flex gap-x-2 justify-between">
          <span className="font-bold">Diagnosis AI</span>
          <div className={`${textColor} text-right`}>
            <span className="font-semibold">{item.persentase}</span>
          </div>
        </div>

        {/* Gambar */}
        <div className="flex justify-between items-center">
          <span className="font-bold">Gambar</span>
          <img
            src={item.imageUrl || testImage}
            alt="Deteksi"
            className="w-24 h-24 rounded-lg shadow-md"
          />
        </div>

        {/* Keluhan */}
        <div className="flex justify-between">
          <span className="font-bold">Keluhan</span>
          <p className="text-right text-sm max-w-[60%] truncate">
            {item.keluhan}
          </p>
        </div>

        {/* Pengajuan */}
        <div className="flex justify-between">
          <span className="font-bold">Pengajuan</span>
          <span
            className={`font-semibold ${
              item.pengajuan === "Sudah" ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.pengajuan}
          </span>
        </div>

        {/* Status */}
        <div className="flex justify-between">
          <span className="font-bold">Status</span>
          <span className={`font-semibold ${statusColor}`}>{item.status}</span>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleinfo}
            className="rounded-full flex items-center justify-center shadow-md cursor-pointer"
          >
            <img src={infoBtn} alt="Info" />
          </button>
          <button className="rounded-full flex items-center justify-center shadow-md cursor-pointer">
            <img src={deleteBtn} alt="Hapus" onClick={handleDelete} />
          </button>
          {item.pengajuan === "Sudah" && (
            <button className="rounded-full flex items-center justify-center shadow-md cursor-pointer">
              <img src={editBtn} alt="Edit" onClick={handleEdit} />
            </button>
          )}
        </div>
        {item.pengajuan === "Tidak" && (
          <div className="w-full flex justify-center">
            <button
              onClick={handleSubmission}
              className="w-3/4 text-sm font-semibold border border-black py-2 mt-2 rounded-lg cursor-pointer"
            >
              Ajukan Verifikasi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

MTableDeteksi.propTypes = {
  item: PropTypes.object.isRequired,
  handleinfo: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSubmission: PropTypes.func.isRequired,
};

export default MTableDeteksi;
