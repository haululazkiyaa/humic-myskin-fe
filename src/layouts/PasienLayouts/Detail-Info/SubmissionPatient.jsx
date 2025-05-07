import melanoma from "../../../assets/icon/Ellipse 3.png";
import keakuratan from "../../../assets/icon/Ellipse 1.png";
import statusIcon from "../../../assets/icon/Ellipse 5.png";
import time from "../../../assets/icon/Ellipse 4.png";
import LoadingCircle from "../../../components/loader/LoadingCircle";
import DoctorList from "../../../components/wellcome/DoctorList";

import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SubmissionsPatientService } from "../../../services/submissions/submissionsPatient.services";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const SubmissionPatient = () => {
  const { id } = useParams();
  const {user} = useAuth();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const {
    data: reSubmission,
    isLoading: isSubmissionLoading,
    isError,
  } = useQuery({
    queryKey: ["submission", id],
    queryFn: () => SubmissionsPatientService.getDetectionsById(id),
    enabled: !!id,
  });

  const dataReSubmission = reSubmission?.data?.data || [];

  if (isSubmissionLoading) {
    return (
      <div className="mt-10">
        <LoadingCircle />
      </div>
    );
  }

  if (isError || !dataReSubmission) {
    return (
      <div className="w-full h-96 flex items-center justify-center font-semibold">
        Gagal memuat data...
      </div>
    );
  }

  const data = dataReSubmission;

  const handleSubmission = async (doctor) => {
    if (!complaint || !doctor || !data?.id) {
      Swal.fire("Error", "Keluhan dan dokter wajib diisi", "error");
      return;
    }

    const payload = {
      doctorId: doctor.id,
      complaint,
    };

    try {
      const response = await SubmissionsPatientService.updateDetection(
        data.id,
        payload,
        user.token
      );
      console.log("data submit:", response);
      Swal.fire("Berhasil", "Pengajuan berhasil dikirim ke dokter", "success");
      setComplaint("");
      setSelectedDoctor(null);
    } catch (error) {
      console.error(error);
      Swal.fire("Gagal", "Terjadi kesalahan saat mengirim data", "error");
    }
  };

  const handleDoctorSelect = async (doctor) => {
    const confirmed = await Swal.fire({
      title: `Pilih Dokter ${doctor.name}?`,
      text: "Apakah Anda yakin ingin mengajukan verifikasi ke dokter ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, pilih dokter ini",
      cancelButtonText: "Batal",
    });

    if (confirmed.isConfirmed) {
      setSelectedDoctor(doctor);
      handleSubmission(doctor);
    }
  };

  const percentValue = parseFloat(data.diagnosisAi);
  const textColor = percentValue >= 50 ? "text-red-600" : "text-green-600";

  const statusColor =
    data.status === "rejected"
      ? "text-red-600"
      : data.status === "pending"
      ? "text-yellow-600"
      : "text-green-600";

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
              <p className={textColor}>
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
              <p
                className={`font-semibold ${
                  data.isSubmitted === "Sudah"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {data.isSubmitted}
              </p>
            </div>
            <div className="w-full shadow-md rounded-lg bg-white flex flex-col items-center gap-y-2 px-4 py-4">
              <img src={statusIcon} alt="Status" className="w-16 h-16" />
              <h4 className="text-black font-semibold">Status</h4>
              <p className={`font-semibold ${statusColor}`}>{data.status}</p>
            </div>
          </div>

          <p className="text-sm font-normal text-gray-400">
            *Hasil deteksi belum dipastikan benar karena web hanya memberikan
            indikasi awal, silahkan ajukan hasil verifikasi ke dokter.
          </p>
          <div className="w-full mt-6">
            <h1 className="text-2xl font-bold text-center text-black">
              Pengajuan Verifikasi
            </h1>
            <p className="text-gray-500 text-center mt-2">
              Ajukan keluhan dan pilih dokter Anda disini
            </p>

            <div className="text-left w-full">
              <p>Keluhan:</p>
              <textarea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                className="w-full h-32 border border-gray-400 rounded-lg p-2 mt-2"
                placeholder="Masukkan keluhan Anda disini"
                required
              ></textarea>
              <DoctorList handleDoctorSelect={handleDoctorSelect} />
              {selectedDoctor && (
                <div className="mt-4 text-sm text-green-700">
                  Dokter terpilih: <strong>dr. {selectedDoctor.name}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPatient;
