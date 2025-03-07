import { useState } from "react";
import image1 from "../assets/img/accordion1.jpg";
import image2 from "../assets/img/accordion2.jpg";
import image3 from "../assets/img/accordion3.jpg";
import arrowUp from "../assets/icon/arrowUp.png";
import arrowDown from "../assets/icon/arrowDown.png";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      title: "Deteksi Awal",
      content:
        "MySkin membantu mendeteksi gejala awal melanoma untuk penanganan yang lebih cepat MySkin membantu mendeteksi gejala awal melanoma untuk penanganan yang lebih cepat.",
      image: image1,
    },
    {
      title: "Diagnosis Dokter",
      content:
        "MySkin menyediakan 10+ dokter untuk memverifikasi penyakit Anda.",
      image: image2,
    },
    {
      title: "Diagnosis AI",
      content:
        "MySkin menggunakan kecerdasan buatan yang andal untuk menganalisa kulit Anda.",
      image: image3,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center md:space-x-8 py-10 px-20 transition-all duration-300 ease-out">
      <div className="w-full md:w-1/2">
        <img
          src={items[activeIndex].image}
          alt="Selected"
          className="rounded-lg w-full h-96"
        />
      </div>
      <div className="w-full md:w-1/2 min-h-96">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg mb-4 overflow-hidden"
          >
            <button
              onClick={() => setActiveIndex(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center bg-white cursor-pointer"
            >
              <span className="font-semibold text-lg">{item.title}</span>
              <span className="text-xl">
                <img src={activeIndex === index ? arrowUp : arrowDown} alt="" />
              </span>
            </button>
            <div
              className={`px-6 transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? "max-h-40 opacity-100 py-4"
                  : "max-h-0 opacity-0 py-0"
              }`}
            >
              <p>{item.content}</p>
              <button className="flex justify-end w-full text-sky-900 font-semibold mt-4 cursor-pointer">
                Lebih banyak →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
