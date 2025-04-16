import PropTypes from "prop-types";
import deleteBtn from "../../assets/icon/delete-button.png";
import infoBtn from "../../assets/icon/info-btn.png";
import testImage from "../../assets/img/test-myskin.jpg";

const MTablePengajuan = ({ item, handleDelete }) => {
  let textColor = "text-green-600";
  if (item.status === "rejected") {
    textColor = "text-red-600";
  } else if (item.status === "pending") {
    textColor = "text-yellow-600";
  }

  return (
    <div className="block lg:hidden w-full mx-auto bg-white rounded-3xl shadow-lg p-6 mb-5">
      <div className="space-y-4">
        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Tanggal Pengajuan</span>
          <span className="text-right">{item.submittedAt}</span>
        </div>

        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Diagnosis AI</span>
          <span className="font-semibold text-right">{item.diagnosis}</span>
        </div>

        <div className="flex justify-between gap-x-4 items-center">
          <span className="font-bold">Gambar</span>
          <img
            src={testImage}
            alt="Deteksi"
            className="w-24 h-24 rounded-lg shadow-md object-cover"
          />
        </div>

        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Keluhan</span>
          <p className="text-right text-sm max-w-[60%] truncate">
            {item.complaint}
          </p>
        </div>

        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Status</span>
          <span className={`font-semibold ${textColor}`}>{item.status}</span>
        </div>

        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Tanggal Diverifikasi</span>
          <span>{item.verifiedAt || "-"}</span>
        </div>

        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Verified By</span>
          <span>{item.doctorId || "-"}</span>
        </div>

        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Melanoma</span>
          <span>{item.diagnosis || "-"}</span>
        </div>

        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Catatan Dokter</span>
          <p className="text-right text-sm max-w-[60%] truncate">
            {item.doctorNote || "-"}
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => (window.location.href = "/info-pengajuan")}
            className="rounded-full flex items-center justify-center shadow-md cursor-pointer"
          >
            <img src={infoBtn} alt="Info" />
          </button>
          <button
            onClick={handleDelete}
            className="rounded-full flex items-center justify-center shadow-md cursor-pointer"
          >
            <img src={deleteBtn} alt="Hapus" />
          </button>
        </div>
      </div>
    </div>
  );
};

MTablePengajuan.propTypes = {
  item: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default MTablePengajuan;
