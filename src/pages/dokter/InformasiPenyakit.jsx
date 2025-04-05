import { useNavigate, useParams } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import ResultDetect from "../../components/ResultDetect";
import testSkin from "../../assets/img/test-myskin.jpg";

const InformasiPenyakit = () => {
  const { id } = useParams(); // <-- extract id from URL
  const navigate = useNavigate();

  //   useEffect(() => {
  //     // Simulate fetching data using the id
  //     const fetchData = async () => {
  //       // Replace with actual API call
  //       const response = await fetch(`/api/penyakit/${id}`);
  //       const result = await response.json();
  //       setData(result);
  //     };

  //     fetchData();
  //   }, [id]);

  //   if (!data) {
  //     return <p>Loading...</p>;
  //   }

  return (
    <div className="container mx-auto py-10">
      <button
        onClick={() => navigate("/dokter/riwayat-verifikasi")}
        className="flex justify-between gap-x-2 items-center px-4 py-2 text-white font-bold rounded-xl bg-sky-800 cursor-pointer"
      >
        <FaArrowLeft className="text-lg text-white" />
        kembali
      </button>
      <div className="text-center flex flex-col items-center">
        <div className="my-5 leading-10">
          <h1 className="text-2xl font-semibold">Prediksi Penyakit</h1>
          <p>ID: {id || "-"}</p>
        </div>
        <img className="rounded-3xl w-full lg:w-1/2" src={testSkin} alt="" />
        <button className="w-full lg:w-1/2 px-4 py-2 my-2 text-white font-bold rounded-full bg-sky-800 hover:bg-sky-900 cursor-pointer">
          Unduh Gambar
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-4 gap-4 w-full">
          <div className="p-4 text-left rounded-lg shadow-md border border-gray-100">
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
          <div className="lg:col-span-2 p-4 text-left rounded-lg shadow-md border border-gray-100">
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
        <div className="p-6 rounded-lg shadow-md w-full text-left border border-gray-100">
          <h1 className="text-xl font-semibold mb-4">
            Verifikasi Hasil Deteksi
          </h1>

          <div className="mb-4">
            <p className="font-medium mb-2">*Verifikasi Melanoma</p>
            <div className="flex gap-8">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" name="verifikasi" />
                <span>Melanoma</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" name="verifikasi" />
                <span>Bukan Melanoma</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="catatan" className="block font-medium mb-2">
              Catatan:
            </label>
            <textarea
              id="catatan"
              name="catatan"
              placeholder="Masukkan catatan pasien disini"
              className="border border-gray-200 rounded-lg w-full p-4 shadow-md min-h-[120px]"
            ></textarea>
          </div>

          <button className="w-full bg-[#12476B] text-white font-semibold py-2 rounded-full hover:bg-[#0f3c5b]">
            Verifikasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformasiPenyakit;
