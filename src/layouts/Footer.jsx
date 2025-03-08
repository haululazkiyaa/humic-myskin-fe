import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import ornamen from "../assets/img/footer2.png";
import ornamen2 from "../assets/img/footer.png";

const Footer = () => {
  return (
    <div className="relative w-full bg-sky-700 text-white py-12 px-20">
      {/* Ornamen Kiri Atas */}
      <img className="absolute top-0 left-0 h-64" src={ornamen} alt="ornamen" />

      <div className="flex justify-between items-start relative">
        {/* Bagian Kiri - Informasi Kontak */}
        <div className="w-1/2">
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-4xl text-white bg-sky-500 p-2 rounded-full" />
              <div>
                <h2 className="text-sm font-normal">
                  Gedung Bangkit Telkom University Jl. Telekomunikasi No. 1,
                  Terusan Buah Batu
                </h2>
                <p className="font-bold">
                  Bandung 40257, Jawa Barat, Indonesia.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-4xl text-white bg-sky-500 p-2 rounded-full" />
              <span>(+62) 812 0812 0812</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-4xl text-white bg-sky-500 p-2 rounded-full" />
              <span>admin@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaGlobe className="text-4xl text-white bg-sky-500 p-2 rounded-full" />
              <span>www.admin.com</span>
            </div>
          </div>
        </div>

        {/* Bagian Kanan - Tentang */}
        <div className="w-1/2">
          <h2 className="text-lg font-semibold">
            Tentang CoE HUMiC Engineering
          </h2>
          <p className="mt-2 text-sm">
            Lorem Ipsum Dolor Sir Amet Lorem Ipsum Dolor Sir Amet Lorem Ipsum
            Dolor Sir Amet.
          </p>
          <p className="text-sm">
            Lorem Ipsum Dolor Sir Amet Lorem Ipsum Dolor Sir Amet Lorem Ipsum
            Dolor Sir Amet.
          </p>

          {/* Social Media */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3">
              <FaFacebookF className="text-4xl text-white bg-sky-500 p-2 rounded-full" />
              <span>Lorem Ipsum</span>
            </div>
            <div className="flex items-center gap-3">
              <FaInstagram className="text-4xl text-white bg-sky-500 p-2 rounded-full" />
              <span>Lorem Ipsum</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ornamen Kanan Bawah */}
      <img
        className="absolute bottom-0 right-0 h-64"
        src={ornamen2}
        alt="ornamen2"
      />
    </div>
  );
};

export default Footer;
