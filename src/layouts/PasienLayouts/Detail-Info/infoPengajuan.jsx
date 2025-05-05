import ResultDetect from "../../../components/wellcome/ResultDetect";
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
  console.log("data submission:",data);

  const calculateAge= (dob) => {
    return dayjs().diff(dayjs(dob), 'year');
  }

  console.log(calculateAge("2007-02-22"))

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
          <button className="w-full lg:w-1/2 px-4 py-2 my-2 text-white font-bold rounded-full bg-sky-800 hover:bg-sky-900 cursor-pointer">
            Unduh Gambar
          </button>

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

          <ResultDetect />

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
