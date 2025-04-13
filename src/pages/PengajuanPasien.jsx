import testImage from "../assets/img/test-myskin.jpg";
import deleteBtn from "../assets/icon/delete-button.png";
import infoBtn from "../assets/icon/info-btn.png";
// import data from "../json/dataAjuan.json";
import Delete from "../components/pop-up/Delete";
import React, { useEffect, useState } from "react";
import MTablePengajuan from "../components/table/MTablePengajuan";
import { getDaftarPengajuan } from "../api/api";

const PengajuanPasien = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [data, setData] = useState([]);

   useEffect(() => {
     const fetchPengajuan = async () => {
       try {
         const result = await getDaftarPengajuan();
         setData(result);
       } catch (error) {
         console.error("Gagal mengambil data pengajuan:", error);
       } 
     };

     fetchPengajuan();
   }, []);

  const handleDelete = () => {
    setShowDelete(true);
  };

  return (
    <>
      {showDelete && <Delete onClose={() => setShowDelete(false)} />}
      <div className="pt-32 w-full px-6">
        <h1 className="text-3xl font-bold text-black">Riwayat Pengajuan</h1>
        {data.map((item) => {
          // Ambil persentase sebagai angka
          let textColor = "text-green-600";
          if (item.status === "rejected") {
            textColor = "text-red-600";
          } else if (item.status === "pending") {
            textColor = "text-yellow-600";
          }
          return (
            <React.Fragment key={item.id}>
              <table
                className="hidden lg:block w-full mt-8 mb-5 rounded-xl shadow-lg bg-white/60 backdrop-blur-md"
              >
                <thead className="w-full border-b border-gray-200 text-left">
                  <tr className="text-black font-semibold">
                    <th className="py-4 px-6">Tanggal Verifikasi</th>
                    <th className="py-4 px-6">Diagnosis AI</th>
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
                    <td className="py-6 px-6">{item.submittedAt}</td>
                    <td className="py-6 px-6 font-semibold">
                      {item.diagnosis}
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
                        {item.complaint}
                      </p>
                    </td>
                    <td className={`py-6 px-6 font-semibold ${textColor}`}>
                      {item.status}
                    </td>
                    <td className="py-6 px-6 font-semibold">{item.verifiedAt}</td>
                    <td className="py-6 px-6 font-semibold">
                      {item.doctorId}
                    </td>
                    <td className="py-6 px-6 text-ellipsis">{item.diagnosis}</td>
                    <td className="py-6 px-6 overflow-hidden text-ellipsis">
                      {item.doctorNote}
                    </td>
                    <td className="py-6 px-6 flex justify-center gap-x-3">
                      <button
                        onClick={() =>
                          (window.location.href = "/info-pengajuan")
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer"
                      >
                        <img src={infoBtn} alt="Info" />
                      </button>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                        <img
                          src={deleteBtn}
                          alt="Hapus"
                          onClick={handleDelete}
                        />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <MTablePengajuan item={item} handleDelete={handleDelete} />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default PengajuanPasien;
