import TanstackRiwayatVerifikasi from "../../components/table/TanstackRiwayatVerifikasi";
import data from "../../json/dataRiwayatVerifikasi.json";

const RiwayatVerifikasi = () => {
  return (
    <div className="py-10 px-6">
      <h1 className="text-3xl font-bold text-black text-center">
        Riwayat Verifikasi
      </h1>
      <TanstackRiwayatVerifikasi data={data.dataRiwayatVerifikasi} />
    </div>
  );
};

export default RiwayatVerifikasi;
