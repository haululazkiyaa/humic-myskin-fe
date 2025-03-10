import bgHomepage from "../assets/img/foto-dokter.jpg"
import scan from "../assets/icon/Scan.png"
import Accordion from "../layouts/Accordion";

import ImageUploader from "../layouts/ImageUploader";
const Homepage = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="w-full h-[32rem]">
        <img
          src={bgHomepage}
          alt="Dokter"
          className="w-full h-full object-cover"
        />

        {/* Text & Button */}
        <div className="absolute left-32 top-48 max-w-md">
          <h1 className="text-5xl font-light text-sky-900">
            Selamat Datang, <br />
            <span className="font-bold">Muhammad</span>
          </h1>
          <button className="mt-6 flex items-center gap-2 bg-white text-blue-900 font-semibold px-6 py-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-100">
            <span className="material-icons"><img src={scan} alt=""/></span>
            Coba Sekarang
          </button>
        </div>
      </div>

      {/* Benefit with MySkin */}
      <Accordion/>

      {/* Image Uploader */}
      <ImageUploader/>
    </div>
  );
}

export default Homepage