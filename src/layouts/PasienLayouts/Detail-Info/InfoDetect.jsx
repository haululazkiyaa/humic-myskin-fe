import { FaArrowLeft } from "react-icons/fa";
import melanoma from "../../../assets/icon/Ellipse 3.png";
import keakuratan from "../../../assets/icon/Ellipse 1.png";
import statusIcon from "../../../assets/icon/Ellipse 5.png";
import time from "../../../assets/icon/Ellipse 4.png";
import LoadingCircle from "../../../components/loader/LoadingCircle";

import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { SubmissionsPatientService } from "../../../services/submissions/submissionsPatient.services";

const InfoDetect = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { user } = useAuth();

  const {
    data: submission,
    isLoading: isSubmissionLoading,
    isError,
  } = useQuery({
    queryKey: ["submission", id],
    queryFn: () => SubmissionsPatientService.getDetectionsById(id),
    enabled: !!id,
  });

  if (isSubmissionLoading) {
    return (
      <div className="mt-10">
        <LoadingCircle />
      </div>
    );
  }

  if (isError || !submission?.data) {
    return (
      <div className="w-full h-96 flex items-center justify-center font-semibold">
        Gagal memuat data...
      </div>
    );
  }

  const data = submission.data;

  return (
    <div className="py-20 lg:py-32 w-full px-4 lg:px-32">
      <div className="w-full rounded-lg shadow-xl bg-white p-6 lg:p-10">
        <button
          onClick={() => navigate("/deteksi")}
          className="flex justify-between gap-x-2 items-center px-4 py-2 text-white font-bold rounded-xl bg-sky-800 cursor-pointer"
        >
          <FaArrowLeft className="text-lg text-white" />
          kembali
        </button>
        <div className="text-center flex flex-col items-center">
          <div className="my-5 leading-10">
            <h1 className="text-2xl font-semibold">Detail Hasil Deteksi</h1>
            <p className="text-sm text-ellipsis">
              {data.isSubmitted === "Sudah"
                ? "Hasil deteksi sudah diverifikasi dokter"
                : "Hasil deteksi belum diverifikasi dokter"}
            </p>
          </div>

          <img
            className="rounded-3xl w-full lg:w-1/2 object-cover"
            src={data.imageUrl}
            alt="Hasil Deteksi Kulit"
          />

          <p className="w-full lg:w-1/2 my-5 text-left font-bold text-md">
            ID Deteksi: {data.id}
          </p>

          <a
            href={data.imageUrl}
            download
            className="w-full lg:w-1/2 px-4 py-2 text-white font-bold rounded-full bg-sky-800 hover:bg-sky-900 cursor-pointer text-center"
          >
            Unduh Gambar
          </a>

          <div className="w-full flex flex-wrap md:flex-nowrap justify-center gap-5 py-4">
            <div className="w-full shadow-md rounded-lg bg-white flex flex-col items-center gap-y-2 px-4 py-4">
              <img src={melanoma} alt="Diagnosis" className="w-16 h-16" />
              <h4 className="text-black font-semibold">Diagnosis</h4>
              <p>{data.diagnosis || "Tidak diketahui"}</p>
            </div>
            <div className="w-full shadow-md rounded-lg bg-white flex flex-col items-center gap-y-2 px-4 py-4">
              <img src={keakuratan} alt="Keakuratan" className="w-16 h-16" />
              <h4 className="text-black font-semibold">Keakuratan</h4>
              <p className="text-green-500">
                {data.diagnosisAi || "Tidak tersedia"}
              </p>
            </div>
            <div className="w-full shadow-md rounded-lg bg-white flex flex-col items-center gap-y-2 px-4 py-4">
              <img
                src={time}
                alt="Pengajuan Verifikasi"
                className="w-16 h-16"
              />
              <h4 className="text-black font-semibold">Pengajuan Verifikasi</h4>
              <p className="text-red-500">{data.isSubmitted}</p>
            </div>
            <div className="w-full shadow-md rounded-lg bg-white flex flex-col items-center gap-y-2 px-4 py-4">
              <img src={statusIcon} alt="Status" className="w-16 h-16" />
              <h4 className="text-black font-semibold">Status</h4>
              <p
                className={`font-semibold ${
                  data.status === "verified" ? "text-green-600" : "text-red-500"
                }`}
              >
                {data.status}
              </p>
            </div>
          </div>

          <p className="text-sm font-normal text-gray-400">
            *Hasil deteksi belum dipastikan benar karena web hanya memberikan
            indikasi awal, silahkan ajukan hasil verifikasi ke dokter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoDetect;
