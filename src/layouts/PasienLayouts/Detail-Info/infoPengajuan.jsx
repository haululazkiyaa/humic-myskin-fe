import { FaArrowLeft } from "react-icons/fa";
import testSkin from "../../../assets/img/test-myskin.jpg";
import ResultDetect from "../../../components/ResultDetect";
const InfoPengajuan = () => {
  return (
    <div className="py-20 lg:py-32 w-full px-4 lg:px-32">
      <div className="w-full rounded-lg shadow-xl bg-white p-4 lg:p-10">
        <button
          onClick={() => (window.location.href = "/pengajuan")}
          className="flex justify-between gap-x-2 items-center px-4 py-2 text-white font-bold rounded-xl bg-sky-800 cursor-pointer"
        >
          <FaArrowLeft className="text-lg text-white" />
          kembali
        </button>
        <div className="text-center flex flex-col items-center">
          <div className="my-5 leading-10">
            <h1 className="text-2xl font-semibold">Prediksi Penyakit</h1>
          </div>
          <img className="rounded-3xl w-full lg:w-1/2" src={testSkin} alt="" />
          <button className="w-full lg:w-1/2 px-4 py-2 my-2 text-white font-bold rounded-full bg-sky-800 hover:bg-sky-900 cursor-pointer">
            Unduh Gambar
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 mt-4 gap-4 w-full">
            <div className="lg:col-span-3 p-4 text-left rounded-lg shadow-md">
              <h1 className="font-bold text-2xl text-black mb-2">
                Diverifikasi Oleh
              </h1>
              <p>Muhammad Nur Shodiq</p>
            </div>
            <div className="p-4 text-left rounded-lg shadow-md">
              <h1 className="font-bold text-2xl text-black mb-2">
                Detail Pasien
              </h1>
              <span className="flex flex-col gap-y-2">
                <p>Nama: Zaky Pasien</p>
                <p>Nomor Telepon: 082246881193</p>
                <p>Email: shodiq@pasien.ac.id</p>
                <p>Umur: 21</p>
              </span>
            </div>
            <div className="lg:col-span-2 p-4 text-left rounded-lg shadow-md">
              <h1 className="font-bold text-2xl text-black mb-2">Keluhan</h1>
              <p>
                Saya pertama kali menyadari adanya perubahan pada tahi lalat di
                punggung saya sekitar enam bulan yang lalu. Awalnya, tahi lalat
                tersebut hanya sedikit lebih besar dari biasanya, tetapi seiring
                waktu, ukurannya bertambah dan warnanya berubah menjadi lebih
                gelap, hampir hitam. Saya juga mulai merasakan gatal di area
                tersebut, dan kadang-kadang benjolan itu berdarah tanpa alasan
                yang jelas
              </p>
            </div>
          </div>
          <ResultDetect />
          <div className="w-full text-left">
            <h1 className="text-2xl font-semibold text-center my-4">
              Catatan Dokter
            </h1>
            <textarea
              className="shadow-md rounded-lg w-full p-4"
              name="catatan"
              id="catatan"
              value={"Jangan lupa minum obat"}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPengajuan;
