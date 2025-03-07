import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImageHelper";

const ImageCropper = ({ image, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleCropComplete = useCallback(
    async (_, croppedAreaPixels) => {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onCropComplete(croppedImage);
    },
    [image, onCropComplete]
  );

  return (
    <div className="relative w-full h-96 bg-gray-200 flex flex-col items-center justify-center">
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1} // 1:1 aspect ratio
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
      />
      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg"
        onClick={() => handleCropComplete()}
      >
        Simpan Crop
      </button>
    </div>
  );
};

ImageCropper.propTypes = {
  image: PropTypes.string.isRequired,
  onCropComplete: PropTypes.func.isRequired,
};

export default ImageCropper;
