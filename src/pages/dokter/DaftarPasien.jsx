import TanstackDaftarPasien from "../../components/table/TanstackDaftarPasien";
import data from "../../json/dataDaftarPasien.json";

const DaftarPasien = () => {
  return (
    <div className="py-10 px-6">
      <h1 className="text-3xl font-bold text-black text-center">
        Riwayat Verifikasi
      </h1>
      <TanstackDaftarPasien data={data.dataDaftarPasien} />
    </div>
  );
};

export default DaftarPasien;
