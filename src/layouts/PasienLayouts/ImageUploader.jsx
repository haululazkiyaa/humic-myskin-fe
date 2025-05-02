import { useState } from "react";
import ImageCropper from "../../components/cropper/ImageCropper";
import ResultDetect from "../../components/wellcome/ResultDetect";
import DoctorList from "../../components/wellcome/DoctorList";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [submission, setSubmission] = useState(true);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setCroppedImage(null);
    }
  };

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
              onCropComplete={(cropped) => {
                setCroppedImage(cropped);
                setIsCropping(false);
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

          {croppedImage && <ResultDetect />}

          {croppedImage && (
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
                  name="keluhan"
                  id=""
                  className="w-full h-32 border border-gray-400 rounded-lg p-2 mt-2"
                  placeholder="Masukkan keluhan Anda disini"
                ></textarea>
                <DoctorList/>
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
