import { FaArrowLeft } from "react-icons/fa";
import testSkin from "../assets/img/test-myskin.jpg";
import melanoma from "../assets/icon/Ellipse 3.png";
import keakuratan from "../assets/icon/Ellipse 1.png";
import status from "../assets/icon/Ellipse 5.png";
import time from "../assets/icon/Ellipse 4.png";
const InfoDetect = () => {
  return (
    <div className="py-32 w-full px-32">
      <div className="w-full rounded-lg shadow-xl bg-white p-10">
        <button className="flex justify-between gap-x-2 items-center px-4 py-2 text-white font-bold rounded-xl bg-sky-800">
          <FaArrowLeft className="text-lg text-white" />
          kembali
        </button>
        <div className="text-center flex flex-col items-center">
          <div className="my-5 leading-10">
            <h1 className="text-2xl font-semibold">Detail Hasil Deteksi</h1>
            <p className="text-sm text-ellipsis">
              Hasil deteksi sudah diverifikasi dokter
            </p>
          </div>
          <img className="rounded-3xl w-1/2" src={testSkin} alt="" />
          <p className="w-1/2 my-5 text-left font-bold text-md">
            ID Deteksi: 16
          </p>
          <button className="w-1/2 px-4 py-2 text-white font-bold rounded-full bg-sky-800 hover:bg-sky-900 cursor-pointer">
            Unduh Gambar
          </button>
          <div className="w-full flex justify-center gap-x-5 py-4">
            <div className="w-64 shadow-md rounded-lg bg-white flex flex-col items-center gap-y-2 px-4 py-4">
              <img src={melanoma} alt="Melanoma" className="w-16 h-16" />
              <h4 className="text-black font-semibold">Melanoma</h4>
              <p>Tidak</p>
            </div>
            <div className="w-64 shadow-md rounded-lg bg-white flex flex-col items-center gap-y-2 px-4 py-4">
              <img src={keakuratan} alt="Keakuratan" className="w-16 h-16" />
              <h4 className="text-black font-semibold">Keakuratan</h4>
              <p className="text-green-500">11.69% Melanoma (Aman)</p>
            </div>
            <div className="w-64 shadow-md rounded-lg bg-white flex flex-col items-center gap-y-2 px-4 py-4">
              <img src={time} alt="Status" className="w-16 h-16" />
              <h4 className="text-black font-semibold">Pengajuan Verifikasi</h4>
              <p className="text-red-500">Pending</p>
            </div>
            <div className="w-64 shadow-md rounded-lg bg-white flex flex-col items-center gap-y-2 px-4 py-4">
              <img src={status} alt="Status" className="w-16 h-16" />
              <h4 className="text-black font-semibold">Status</h4>
              <p className="text-red-500">Unverified</p>
            </div>
          </div>
          <p className="text-sm font-normal text-gray-400">
            *Hasil deteksi belum dipastikan benar karena web hanya memberikan
            indikasi awal, silahkan ajukan hasil verifikasi ke dokter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoDetect;
