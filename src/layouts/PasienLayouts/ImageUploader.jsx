import { useState } from "react";
import ImageCropper from "../../components/cropper/ImageCropper";
import ResultDetect from "../../components/ResultDetect";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setCroppedImage(null);
    }
  };

  return (
    <div className="flex justify-center py-10 px-20 w-full">
      <div className="bg-white p-8 rounded-lg border border-gray-400 w-full">
        <h1 className="text-2xl font-bold text-center text-black">
          Deteksi Kanker Kulit
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Masukkan gambar untuk mendeteksi kanker dari gambar yang diberikan
        </p>

        <div className="w-full flex flex-col items-center">
          {!isCropping ? (
            <div className="w-1/3 h-60 border-2 border-dashed border-gray-400 bg-blue-50 rounded-lg mt-6 flex justify-center items-center relative">
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
                <label className="w-1/3 font-bold border border-gray-800 rounded-full px-6 py-2 cursor-pointer text-center">
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
                  className="w-1/3 font-bold border border-gray-800 rounded-full px-6 py-2 cursor-pointer"
                  onClick={() => setIsCropping(true)}
                >
                  Crop Foto
                </button>
              )}
            </div>
          )}

          {croppedImage && (
            <ResultDetect/>
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
