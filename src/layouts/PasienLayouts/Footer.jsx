import {
  FaEnvelope,
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

import ornamen from "../../assets/img/footer2.png";
import ornamen2 from "../../assets/img/footer.png";

const Footer = () => {
  return (
    <div className="relative w-full bg-sky-700 text-white py-12 px-6 md:px-32">
      {/* Ornamen Kiri Atas */}
      <img className="absolute top-0 left-0 h-64" src={ornamen} alt="ornamen" />

      <div className="grid grid-cols-1 gap-y-4 md:flex justify-between items-start relative">
        {/* Bagian Kiri - Informasi Kontak */}
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold">Kontak:</h2>
          <div className="mt-4 space-y-3">
            {/* <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-4xl text-white bg-sky-300 p-2 rounded-full" />
              <span>(+62) 812 0812 0812</span>
            </div> */}
            <a
              className="flex items-center gap-3"
              href="mailto:humic@telkomuniversity.ac.id"
            >
              <FaEnvelope className="text-4xl text-white bg-sky-300 p-2 rounded-full" />
              <span>humic@telkomuniversity.ac.id</span>
            </a>
            <a
              className="flex items-center gap-3"
              href="https://humic.telkomuniversity.ac.id/"
            >
              <FaGlobe className="text-4xl text-white bg-sky-300 p-2 rounded-full" />
              <span>https://humic.telkomuniversity.ac.id</span>
            </a>
            <a
              className="flex items-center gap-3"
              href="https://www.instagram.com/humicengineering/"
            >
              <FaInstagram className="text-4xl text-white bg-sky-300 p-2 rounded-full" />
              <span>@humicengineering</span>
            </a>
          </div>
        </div>

        {/* Bagian Kanan - Tentang */}
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold">HUMiC Engineering Tel-U</h2>
          <p className="mt-2 text-sm">
            Pusat riset Telkom University di bidang teknologi untuk kesehatan &
            kesejahteraan manusia.
          </p>

          {/* Social Media */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-4xl text-white bg-sky-300 p-2 rounded-full" />
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
            {/* <div className="flex items-center gap-3">
              <FaFacebookF className="text-4xl text-white bg-sky-300 p-2 rounded-full" />
              <span>Lorem Ipsum</span>
            </div> */}
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
