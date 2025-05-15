import melanoma from "../../../assets/icon/Ellipse 3.png";
import keakuratan from "../../../assets/icon/Ellipse 1.png";
import statusIcon from "../../../assets/icon/Ellipse 5.png";
import LoadingCircle from "../../../components/loader/LoadingCircle";
import dayjs from "dayjs";

import { FaArrowLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { SubmissionsPatientService } from "../../../services/submissions/submissionsPatient.services";

const InfoPengajuan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    data: submissionData,
    isLoading: isSubmissionLoading,
    isError,
  } = useQuery({
    queryKey: ["submission", id],
    queryFn: () => SubmissionsPatientService.getSubmissionsById(id),
    enabled: !!id,
  });

  if (isSubmissionLoading) {
    return (
      <div className="mt-10">
        <LoadingCircle />
      </div>
    );
  }

  if (isError || !submissionData?.data) {
    return (
      <div className="w-full h-96 flex items-center justify-center font-semibold">
        Gagal memuat data...
      </div>
    );
  }

  const data = submissionData.data.data;
  const percentValue = parseFloat(data.diagnosisAi);
  const textColor = percentValue >= 50 ? "text-red-600" : "text-green-600";

  const statusColor =
    data.status === "rejected"
      ? "text-red-600"
      : data.status === "pending"
      ? "text-yellow-600"
      : "text-green-600";

  const calculateAge = (dob) => {
    return dayjs().diff(dayjs(dob), "year");
  };
  
  return (
    <div className="py-20 lg:py-32 w-full px-4 lg:px-32">
      <div className="w-full rounded-lg shadow-xl bg-white p-4 lg:p-10">
        <button
          onClick={() => navigate("/pengajuan")}
          className="flex justify-between gap-x-2 items-center px-4 py-2 text-white font-bold rounded-xl bg-sky-800 cursor-pointer"
        >
          <FaArrowLeft className="text-lg text-white" />
          kembali
        </button>
        <div className="text-center flex flex-col items-center">
          <div className="my-5 leading-10">
            <h1 className="text-2xl font-semibold">Prediksi Penyakit</h1>
          </div>
          <img
            className="rounded-3xl w-full lg:w-1/2"
            src={
              data.imageUrl ||
              "https://via.placeholder.com/600x400?text=No+Image"
            }
            alt="Hasil Deteksi"
          />
          <a
            href={data.imageUrl}
            download
            className="w-full lg:w-1/2 px-4 py-2 text-white font-bold rounded-full bg-sky-800 hover:bg-sky-900 cursor-pointer text-center"
          >
            Unduh Gambar
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-3 mt-4 gap-4 w-full">
            <div className="lg:col-span-3 p-4 text-left rounded-lg shadow-md">
              <h1 className="font-bold text-2xl text-black mb-2">
                Diverifikasi Oleh
              </h1>
              <p>Dr. {data.verifiedBy}</p>
            </div>
            <div className="p-4 text-left rounded-lg shadow-md">
              <h1 className="font-bold text-2xl text-black mb-2">
                Detail Pasien
              </h1>
              <span className="flex flex-col gap-y-2">
                <p>Nama: {user?.data?.name || "Pasien"}</p>
                <p>Nomor Telepon: {user?.data?.phone || "-"}</p>
                <p>Email: {user?.data?.email || "-"}</p>
                <p>Umur: {calculateAge(user?.data?.dob)}</p>
              </span>
            </div>
            <div className="lg:col-span-2 p-4 text-left rounded-lg shadow-md">
              <h1 className="font-bold text-2xl text-black mb-2">Keluhan</h1>
              <p>{data.complaint}</p>
            </div>
          </div>

          {/* Informasi Detail */}
          <div className="w-full flex flex-wrap md:flex-nowrap justify-center gap-5 py-4">
            {/* Diagnosis */}
            <div className="w-full shadow-md rounded-lg bg-white flex flex-col items-center gap-y-2 px-4 py-4">
              <img src={melanoma} alt="Diagnosis" className="w-16 h-16" />
              <h4 className="text-black font-semibold">Diagnosis</h4>
              <p>{data.diagnosis || "Tidak diketahui"}</p>
            </div>

            {/* Keakuratan */}
            <div className="w-full shadow-md rounded-lg bg-white flex flex-col items-center gap-y-2 px-4 py-4">
              <img src={keakuratan} alt="Keakuratan" className="w-16 h-16" />
              <h4 className="text-black font-semibold">Keakuratan</h4>
              <p className={textColor}>
                {data.diagnosisAi || "Tidak tersedia"}
              </p>
            </div>
            {/* Status */}
            <div className="w-full shadow-md rounded-lg bg-white flex flex-col items-center gap-y-2 px-4 py-4">
              <img src={statusIcon} alt="Status" className="w-16 h-16" />
              <h4 className="text-black font-semibold">Status</h4>
              <p className={`font-semibold ${statusColor}`}>{data.status}</p>
            </div>
          </div>

          <div className="w-full text-left">
            <h1 className="text-2xl font-semibold text-center my-4">
              Catatan Dokter
            </h1>
            <textarea
              className="shadow-md rounded-lg w-full p-4"
              name="catatan"
              id="catatan"
              value={data.doctorNote}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPengajuan;
