import PropTypes from "prop-types";
import deleteBtn from "../../assets/icon/delete-button.png";
import infoBtn from "../../assets/icon/info-btn.png";
import testImage from "../../assets/img/test-myskin.jpg";

const MTablePengajuan = ({ item, handleDelete }) => {
  const percentValue = parseFloat(item.persentase);
  const textColor = percentValue >= 50 ? "text-red-600" : "text-green-600";

  const statusColor =
    item.status === "rejected"
      ? "text-red-600"
      : item.status === "pending"
      ? "text-yellow-600"
      : "text-green-600";

  const diagnosisText =
    item.diagnosis === null
      ? "Menunggu"
      : item.diagnosis !== "Melanoma"
      ? "Bukan Melanoma"
      : "Melanoma";

  return (
    <div className="block lg:hidden w-full mx-auto bg-white rounded-3xl shadow-lg p-6 mb-5">
      <div className="space-y-4">
        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Tanggal Pengajuan</span>
          <span className="text-right">{item.date}</span>
        </div>

        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Diagnosis AI</span>
          <span className={`font-semibold text-right ${textColor}`}>
            {item.persentase}
          </span>
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
            {item.keluhan}
          </p>
        </div>

        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Status</span>
          <span className={`font-semibold ${statusColor}`}>{item.status}</span>
        </div>

        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Tanggal Diverifikasi</span>
          <span>{item.tglVerif || "-"}</span>
        </div>

        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Verified By</span>
          <span>{item.verifiedBy || "-"}</span>
        </div>

        <div className="flex justify-between gap-x-4">
          <span className="font-bold">Melanoma</span>
          <span>{diagnosisText || "-"}</span>
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
  handleDelete: PropTypes.func.isRequired,
};

export default MTablePengajuan;
