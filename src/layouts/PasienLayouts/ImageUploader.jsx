import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { SubmissionsPatientService } from "../../services/submissions/submissionsPatient.services";

import Swal from "sweetalert2";
import ImageCropper from "../../components/cropper/ImageCropper";
import keakuratan from "../../assets/icon/Ellipse 1.png";
import melanoma from "../../assets/icon/Ellipse 3.png";
import DoctorList from "../../components/wellcome/DoctorList";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [submission, setSubmission] = useState(true);
  const [detectionResult, setDetectionResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSubmittedRef = useRef(false);
  const [complaint, setComplaint] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const { user } = useAuth();
  const patientId = user?.data?.id;

  const mutation = useMutation({
    mutationFn: (formData) =>
      SubmissionsPatientService.createDetection(formData),
    onSuccess: (data) => {
      console.log("Detection submitted successfully:", data);
      setDetectionResult(data?.data?.data);
      setIsProcessing(false);
    },
    onError: (error) => {
      console.error("Detailed error response:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
      setIsProcessing(false);
    },
  });

  const publicMutation = useMutation({
    mutationFn: (formData) =>
      SubmissionsPatientService.createPublicDetection(formData),
    onSuccess: (data) => {
      console.log("Public detection successful:", data);
      setDetectionResult(data?.data);
      setIsProcessing(false);
    },
    onError: (error) => {
      console.error("Error on public detection:", error);
      setIsProcessing(false);
    },
  });
  

  const submitDetection = async (croppedImageUrl) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    if (!croppedImageUrl) {
      console.error("Missing cropped image URL");
      return;
    }
    
    try {
      setIsProcessing(true);

      if (
        !croppedImageUrl.startsWith("blob:") &&
        !croppedImageUrl.startsWith("data:")
      ) {
        console.error("Invalid image URL format:", croppedImageUrl);
        setIsProcessing(false);
        return;
      }

      const response = await fetch(croppedImageUrl);
      if (!response.ok) throw new Error("Failed to fetch cropped image");

      const blob = await response.blob();
      if (!blob || blob.size === 0) {
        throw new Error("Empty image blob");
      }

      const file = new File([blob], "diagnosis.jpg", {
        type: blob.type || "image/jpeg",
      });

      const formData = new FormData();
      formData.append("image", file, file.name);
      if (user && patientId) {
        formData.append("patient_id", patientId.toString());
        for (let [key, value] of formData.entries()) {
          console.log(
            key,
            value instanceof File ? `${value.name} (${value.type})` : value
          );
        }
        mutation.mutate(formData); 
      } else {
        for (let [key, value] of formData.entries()) {
          console.log(
            key,
            value instanceof File ? `${value.name} (${value.type})` : value
          );
        }
        publicMutation.mutate(formData); 
      }      
    } catch (error) {
      console.error("Submission error details:", {
        error: error.message,
        patientId,
        hasCroppedImage: !!croppedImageUrl,
        userAuthStatus: !!user,
      });
      setIsProcessing(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmission = async (doctor) => {
    if (!complaint || !doctor || !detectionResult?.id) {
      Swal.fire("Error", "Keluhan dan dokter wajib diisi", "error");
      return;
    }

    const payload = {
      doctorId: doctor.id,
      complaint,
    };

    try {
      const response = await SubmissionsPatientService.updateDetection(
        detectionResult.id,
        payload,
        user.token
      );
      console.log("data submit:",response);
      Swal.fire("Berhasil", "Pengajuan berhasil dikirim ke dokter", "success");
      setSubmission(true);
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
 const handleImageUpload = (event) => {
   const file = event.target.files[0];
   if (file) {
     setImage(URL.createObjectURL(file));
     setCroppedImage(null);
     setDetectionResult(null);
     setSubmission(true);
     hasSubmittedRef.current = false; 
   }
 };

  const textLevel = detectionResult?.percentage >= 50 ? "Tidak Aman" : "Aman";
  const melanomaLevel = detectionResult?.percentage >= 50 ? "Melanoma" : "Bukan Melanoma";

  return (
    <div className="flex justify-center py-10 px-10 md:px-20 w-full">
      <div className="md:bg-white md:py-8 md:px-20 md:rounded-lg md:border md:border-gray-400 w-full">
        <h1 className="text-2xl font-bold text-center text-black">
          Deteksi Kanker Kulit
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Masukkan gambar untuk mendeteksi kanker dari gambar yang diberikan
        </p>

        <div className="w-full flex flex-col items-center">
          {!isCropping ? (
            <div className="w-full md:w-1/3 h-60 border-2 border-dashed border-gray-400 bg-blue-50 rounded-lg mt-6 flex justify-center items-center relative">
              {croppedImage ? (
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className="max-h-58 w-full object-cover rounded-lg"
                />
              ) : image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  className="max-h-58 w-full object-cover rounded-lg"
                />
              ) : (
                <label className="cursor-pointer flex flex-col items-center text-blue-900 font-semibold">
                  <span className="text-lg">+ Masukkan Gambar</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg, image/png"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          ) : (
            <ImageCropper
              image={image}
              onCropComplete={async (cropped) => {
                setCroppedImage(cropped);
                setIsCropping(false);

                if (!hasSubmittedRef.current && cropped) {
                  hasSubmittedRef.current = true;
                  await submitDetection(cropped);
                }
              }}
            />
          )}

          {image && !isCropping && (
            <div className="w-full flex justify-center mt-3">
              {croppedImage ? (
                <label className="md:w-1/3 font-bold border border-gray-800 rounded-full px-6 py-2 cursor-pointer text-center">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg, image/png"
                    onChange={handleImageUpload}
                  />
                  Ganti Foto
                </label>
              ) : (
                <button
                  className="md:w-1/3 font-bold text-white bg-sky-900 rounded-full px-6 py-2 cursor-pointer"
                  onClick={() => setIsCropping(true)}
                >
                  Crop Foto
                </button>
              )}
            </div>
          )}

          {isProcessing && (
            <div className="mt-4 text-center">
              <p className="text-gray-600">Memproses deteksi...</p>
            </div>
          )}

          {croppedImage && detectionResult && (
            <div className="w-full flex flex-wrap md:flex-nowrap justify-center gap-5 py-6">
              <div className="w-full h-48 shadow-md rounded-lg bg-white flex flex-col justify-center items-center gap-y-2 px-4 py-4 border border-gray-100">
                <img src={melanoma} alt="Melanoma" className="w-16 h-16" />
                <h4 className="text-black font-semibold">Melanoma</h4>
                <p>{detectionResult.diagnosis || melanomaLevel}</p>
              </div>
              <div className="w-full h-48 shadow-md rounded-lg bg-white flex flex-col justify-center items-center gap-y-2 px-4 py-4 border border-gray-100">
                <img src={keakuratan} alt="Keakuratan" className="w-16 h-16" />
                <h4 className="text-black font-semibold">Keakuratan</h4>
                <p className="text-green-500">
                  {`${detectionResult.percentage}% ${detectionResult.diagnosisAi} (${textLevel})`}
                </p>
              </div>
            </div>
          )}

          {croppedImage && user && (
            <button
              onClick={() => setSubmission((prev) => !prev)}
              className={`md:w-1/3 font-bold text-white rounded-full px-6 py-2 my-4 cursor-pointer ${
                submission ? "bg-sky-900" : "bg-red-700"
              }`}
            >
              {submission ? "Ajukan Verifikasi/Keluhan" : "Batalkan Pengajuan"}
            </button>
          )}

          {!submission && croppedImage && (
            <div className="w-full">
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
          )}
        </div>

        {!croppedImage && (
          <div className="mt-6 text-sm text-gray-700">
            <p className="text-black">
              1. Format: JPEG, PNG <span className="text-red-500">*</span>
            </p>
            <p className="text-black">
              2. Ukuran: Maksimum 5 MB <span className="text-red-500">*</span>
            </p>
            <p className="text-black">
              3. Resolusi: Minimal 800 x 600 piksel{" "}
              <span className="text-red-500">*</span>
            </p>
            <p className="text-red-500 mt-2 italic">
              *Wajib mengikuti aturan gambar
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
