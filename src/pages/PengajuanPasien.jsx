import testImage from "../assets/img/test-myskin.jpg";
import deleteBtn from "../assets/icon/delete-button.png";
import infoBtn from "../assets/icon/info-btn.png";

const PengajuanPasien = () => {
  const dataAjuan = [
    {
      date: "08/01/2025",
      persentase: "99% Melanoma (Tidak Aman)",
      gambar: testImage,
      keluhan:
        "Saya pertama kali menyadari adanya perubahan pada tahi lalat di punggung saya sekitar enam bulan yang lalu...",
      status: "Unverified",
      tglVerif: "11/01/2025",
      verifiedBy: "dr. Muhammad Nur Shodiq",
      melanoma: "Melanoma",
      catatanDokter:
        "Catatan DokterCatatan DokterCatatan DokterCatatan DokterCatatan Dokter",
    },
    {
      date: "12/03/2025",
      persentase: "11.26% Melanoma (Aman)",
      gambar: testImage,
      keluhan:
        "Saya pertama kali menyadari adanya perubahan pada tahi lalat di punggung saya sekitar enam bulan yang lalu...",
      status: "Verified",
      tglVerif: "16/03/2025",
      verifiedBy: "dr. Muhammad Nur Shodiq",
      melanoma: "Melanoma",
      catatanDokter:
        "Catatan DokterCatatan DokterCatatan DokterCatatan DokterCatatan Dokter",
    },
    {
      date: "15/03/2025",
      persentase: "50% Melanoma (Tidak Aman)",
      gambar: testImage,
      keluhan:
        "Saya pertama kali menyadari adanya perubahan pada tahi lalat di punggung saya sekitar enam bulan yang lalu...",
      status: "Unverified",
      tglVerif: "20/03/2025",
      verifiedBy: "dr. Muhammad Nur Shodiq",
      melanoma: "Melanoma",
      catatanDokter:
        "Catatan DokterCatatan DokterCatatan DokterCatatan DokterCatatan Dokter",
    },
  ];

  return (
    <div className="pt-32 w-full px-10">
      <h1 className="text-3xl font-bold text-black">Riwayat Pengajuan</h1>
      {dataAjuan.map((item, index) => {
        // Ambil persentase sebagai angka
        const percentValue = parseFloat(item.persentase);
        let textColor = "text-green-600";
        if (percentValue >= 50) {
          textColor = "text-red-600";
        } 
        return (
          <table
            key={index}
            className="w-full mt-8 mb-5 rounded-xl shadow-lg bg-white/60 backdrop-blur-md"
          >
            <thead className="border-b border-gray-200 text-left">
              <tr className="text-black font-semibold">
                <th className="py-4 px-6">Tanggal tglVerif</th>
                <th className="py-4 px-6">Persentase</th>
                <th className="py-4 px-6">Gambar</th>
                <th className="py-4 px-6">Keluhan</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Tanggal Diverifikasi</th>
                <th className="py-4 px-6">Verified By</th>
                <th className="py-4 px-6">Melanoma</th>
                <th className="py-4 px-6">Catatan Dokter</th>
                <th className="py-4 px-6">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center text-gray-800">
              <tr className="*:align-top">
                <td className="py-6 px-6">{item.date}</td>
                <td className={`py-6 px-6 font-semibold ${textColor}`}>
                  {item.persentase}
                </td>
                <td className="py-6 px-6">
                  <div className="w-20 h-16 rounded-lg overflow-hidden mx-auto">
                    <img
                      className="w-full h-full object-cover"
                      src={testImage}
                      alt="Deteksi"
                    />
                  </div>
                </td>
                <td className="py-6 px-6 text-left">
                  <p className="w-40 h-32 overflow-hidden text-ellipsis">
                    {item.keluhan}
                  </p>
                </td>
                <td
                  className={`py-6 px-6 font-semibold ${
                    item.status === "Unverified"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {item.status}
                </td>
                <td className="py-6 px-6 font-semibold">{item.tglVerif}</td>
                <td className="py-6 px-6 font-semibold">{item.verifiedBy}</td>
                <td className="py-6 px-6 text-ellipsis">{item.melanoma}</td>
                <td className="py-6 px-6 overflow-hidden text-ellipsis">
                  {item.catatanDokter}
                </td>
                <td className="py-6 px-6 flex justify-center gap-x-3">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                    <img src={infoBtn} alt="Info" />
                  </button>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                    <img src={deleteBtn} alt="Hapus" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default PengajuanPasien;
