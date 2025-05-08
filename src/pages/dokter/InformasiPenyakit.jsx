import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DoctorService } from "../../services/doctor/doctor.services";
import { FaArrowLeft } from "react-icons/fa";
import ResultDetect from "../../components/wellcome/ResultDetect";
import Swal from "sweetalert2";
import defaultImagePath from "../../assets/img/default.png";
import { toast } from "react-hot-toast";

const InformasiPenyakit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submissionData, setSubmissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [diagnosis, setDiagnosis] = useState("");
  const [doctorNote, setDoctorNote] = useState("");
  const [imageError, setImageError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state for submit button

  useEffect(() => {
    const fetchSubmissionDetail = async () => {
      try {
        setLoading(true);
        const response = await DoctorService.getSubmissionDetail(id);
        setSubmissionData(response.data.data);
        console.log("Submission Data:", response.data.data);

        // Pre-fill form if data exists
        if (response.data.data.diagnosis) {
          setDiagnosis(response.data.data.diagnosis);
        }
        if (response.data.data.doctorNote) {
          setDoctorNote(response.data.data.doctorNote);
        }
      } catch (error) {
        console.error("Error fetching submission detail:", error);
        toast.error("Gagal memuat data submission");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSubmissionDetail();
      // Reset image error state when component mounts or ID changes
      setImageError(false);
    }
  }, [id]);

  const handleImageError = () => {
    setImageError(true);
    console.log("Image failed to load, using default image");
  };

  const handleVerifySubmission = async () => {
    // Validate form first
    if (!diagnosis) {
      toast.error("Silakan pilih diagnosis terlebih dahulu");
      return;
    }

    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Konfirmasi Verifikasi",
      html:
        "Apakah Anda sudah memverifikasi data dengan benar?<br><br>" +
        "<b>Hasil verifikasi tidak dapat diubah lagi</b><br>" +
        "Pastikan Anda memeriksa dengan benar keluhan pasien.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#12476B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, verifikasi",
      cancelButtonText: "Batalkan",
    });

    // If confirmed, proceed with submission
    if (result.isConfirmed) {
      try {
        setIsSubmitting(true); // Set loading state when submitting

        const verificationData = {
          diagnosis,
          doctorNote,
        };

        await DoctorService.verifySubmission(id, verificationData);

        // Show success message
        toast.success("Verifikasi berhasil");

        // Navigate away after successful submission
        navigate("/dokter/riwayat-verifikasi");
      } catch (error) {
        console.error("Error verifying submission:", error);
        toast.error("Gagal memverifikasi submission");
      } finally {
        setIsSubmitting(false); // Reset loading state when done
      }
    }
  };

  // Function to handle image download
  const handleDownloadImage = () => {
    if (!submissionData?.imageUrl || imageError) {
      toast.error("Gambar tidak tersedia untuk diunduh");
      return;
    }

    // Create an anchor element and set properties for download
    const link = document.createElement("a");
    link.href = submissionData.imageUrl;
    link.download = `skin-condition-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-6 lg:px-0 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  const isVerified = submissionData?.status === "verified";
  const displayImageSrc = imageError
    ? defaultImagePath
    : submissionData?.imageUrl;

  return (
    <div className="container mx-auto py-10 px-6 lg:px-0">
      <button
        onClick={() => navigate("/dokter/riwayat-verifikasi")}
        className="flex justify-between gap-x-2 items-center px-4 py-2 text-white font-bold rounded-xl bg-sky-800 cursor-pointer"
      >
        <FaArrowLeft className="text-lg text-white" />
        kembali
      </button>
      <div className="text-center flex flex-col items-center">
        <div className="my-5 leading-10">
          <h1 className="text-2xl font-semibold">Prediksi Penyakit</h1>
          <p>ID: {id || "-"}</p>
        </div>

        {/* Image with error handling */}
        <img
          className="rounded-3xl w-full lg:w-1/2 object-cover max-h-[400px]"
          src={displayImageSrc || defaultImagePath}
          alt="Skin condition"
          onError={handleImageError}
        />

        <button
          className={`w-full lg:w-1/2 px-4 py-2 my-2 text-white font-bold rounded-full ${
            imageError
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-sky-800 hover:bg-sky-900 cursor-pointer"
          }`}
          onClick={handleDownloadImage}
          disabled={imageError}
        >
          {imageError ? "Gambar tidak tersedia" : "Unduh Gambar"}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 mt-4 gap-4 w-full">
          <div className="p-4 text-left rounded-lg shadow-md border border-gray-100">
            <h1 className="font-bold text-2xl text-black mb-2">
              Detail Pasien
            </h1>
            <span className="flex flex-col gap-y-2">
              <p>Nama: {submissionData?.patientName || "-"}</p>
              <p>ID Pasien: {submissionData?.patientId || "-"}</p>
              <p>Status: {submissionData?.status || "-"}</p>
              <p>Tanggal Submit: {submissionData?.submittedAt || "-"}</p>
              {submissionData?.verifiedAt && (
                <p>Tanggal Verifikasi: {submissionData.verifiedAt}</p>
              )}
            </span>
          </div>
          <div className="lg:col-span-2 p-4 text-left rounded-lg shadow-md border border-gray-100">
            <h1 className="font-bold text-2xl text-black mb-2">Keluhan</h1>
            <p>{submissionData?.complaint || "Tidak ada keluhan"}</p>
          </div>
        </div>
        {submissionData?.diagnosisAi && (
          <ResultDetect
            diagnosis={submissionData.diagnosisAi}
            percentage={submissionData.percentage}
            status={submissionData.status}
          />
        )}
        <div className="p-6 mt-4 rounded-lg shadow-md w-full text-left border border-gray-100">
          <h1 className="text-xl font-semibold mb-4">
            {isVerified
              ? "Hasil Verifikasi Dokter"
              : "Verifikasi Hasil Deteksi"}
          </h1>

          <div className="mb-4">
            <p className="font-bold mb-2">
              {isVerified ? "Diagnosis Dokter:" : "*Verifikasi Diagnosis"}
            </p>
            <div className="flex gap-8">
              <label
                className={`flex items-center gap-2 ${
                  isVerified ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <input
                  type="radio"
                  className="w-4 h-4"
                  name="diagnosis"
                  value="Melanoma"
                  checked={diagnosis === "Melanoma"}
                  onChange={(e) => !isVerified && setDiagnosis(e.target.value)}
                  disabled={isVerified}
                />
                <span>Melanoma</span>
              </label>
              <label
                className={`flex items-center gap-2 ${
                  isVerified ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <input
                  type="radio"
                  className="w-4 h-4"
                  name="diagnosis"
                  value="Bukan Melanoma"
                  checked={diagnosis === "Bukan Melanoma"}
                  onChange={(e) => !isVerified && setDiagnosis(e.target.value)}
                  disabled={isVerified}
                />
                <span>Bukan Melanoma</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="catatan" className="block font-bold mb-2">
              {isVerified ? "Catatan Dokter:" : "Catatan:"}
            </label>
            {isVerified ? (
              <div className="border border-gray-200 rounded-lg w-full p-4 shadow-md min-h-[120px] bg-gray-50">
                {doctorNote || "Tidak ada catatan"}
              </div>
            ) : (
              <textarea
                id="catatan"
                name="catatan"
                placeholder="Masukkan catatan untuk pasien disini"
                className="border border-gray-200 rounded-lg w-full p-4 shadow-md min-h-[120px]"
                value={doctorNote}
                onChange={(e) => setDoctorNote(e.target.value)}
              ></textarea>
            )}
          </div>

          {!isVerified && (
            <button
              className={`w-full text-white font-semibold py-2 rounded-full ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#12476B] hover:bg-[#0f3c5b] cursor-pointer"
              }`}
              onClick={handleVerifySubmission}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Memproses...
                </div>
              ) : (
                "Verifikasi"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InformasiPenyakit;
