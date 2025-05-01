import keakuratan from "../assets/icon/Ellipse 1.png";
import melanoma from "../assets/icon/Ellipse 3.png";

const ResultDetect = () => {
  return (
    <div className="w-full flex flex-wrap md:flex-nowrap justify-center gap-5 py-6">
      <div className="w-full h-48 shadow-md rounded-lg bg-white flex flex-col justify-center items-center gap-y-2 px-4 py-4 border border-gray-100">
        <img src={melanoma} alt="Melanoma" className="w-16 h-16" />
        <h4 className="text-black font-semibold">Melanoma</h4>
        <p>Tidak</p>
      </div>
      <div className="w-full h-48 shadow-md rounded-lg bg-white flex flex-col justify-center items-center gap-y-2 px-4 py-4 border border-gray-100">
        <img src={keakuratan} alt="Keakuratan" className="w-16 h-16" />
        <h4 className="text-black font-semibold">Keakuratan</h4>
        <p className="text-green-500">11.69% Melanoma (Aman)</p>
      </div>
    </div>
  );
};

export default ResultDetect;
