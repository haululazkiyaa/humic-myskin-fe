import Accordion from "../layouts/PasienLayouts/Accordion";
import ImageUploader from "../layouts/PasienLayouts/ImageUploader";
import bgHomepage from "../assets/img/foto-dokter.jpg";
import scan from "../assets/icon/Scan.png";
import { useAuth } from "../context/AuthContext";

const Homepage = () => {
  const { user } = useAuth();

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="w-full h-80 md:h-[32rem]">
        <img
          src={bgHomepage}
          alt="Dokter"
          className="w-full h-full object-cover"
        />

        {/* Text & Button */}
        <div className="absolute left-8 md:left-32 top-28 md:top-48 max-w-md">
          <h1 className="text-4xl md:text-5xl font-light text-sky-900">
            Selamat Datang, <br />
            <span className="font-bold">{user?.data?.name || "Pasien"}</span>
          </h1>
          <button
            onClick={() => (window.location.href = "#deteksi")}
            className="mt-4 md:mt-6 flex items-center gap-2 bg-white text-blue-900 font-semibold px-4 md:px-6 py-1 md:py-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-100"
          >
            <span className="material-icons">
              <img src={scan} alt="" />
            </span>
            Coba Sekarang
          </button>
        </div>
      </div>

      {/* Benefit with MySkin */}
      <Accordion />

      {/* Image Uploader */}
      <div id="deteksi">
        <ImageUploader />
      </div>
    </div>
  );
};

export default Homepage;
