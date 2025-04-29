import { useEffect, useMemo, useState } from "react";

import Delete from "../components/pop-up/Delete";
// import data from "../json/dataAjuan.json";

import deleteBtn from "../assets/icon/delete-button.png";
import infoBtn from "../assets/icon/info-btn.png";
import testImage from "../assets/img/test-myskin.jpg";
import MTablePengajuan from "../components/table/MTablePengajuan";
import { SubmissionsService } from "../services/submissions/submissions.service";
import { useQuery } from "@tanstack/react-query";
import { AccountsService } from "../services/accounts/accounts.services";

const PengajuanPasien = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.data?.id;

  const [showDelete, setShowDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataPerPage, setDataPerPage] = useState(5);

  const {
    data: submissionsData,
    isLoading: isLoadingSubmissions,
    // isError,
    refetch,
  } = useQuery({
    queryKey: ["submissions", userId],
    queryFn: () => SubmissionsService.getSubmissions({ userId }),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const submissions = useMemo(() => {
    return submissionsData?.data?.data || [];
  }, [submissionsData]);

  // Ambil semua doctorId unik dari submissions
  const doctorIds = useMemo(() => {
    return [
      ...new Set(submissions.map((item) => item.doctorId).filter(Boolean)),
    ];
  }, [submissions]);

  const [doctorData, setDoctorData] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorPromises = doctorIds.map(
          (id) => AccountsService.getAccountById(id)
        );
        const doctors = await Promise.all(doctorPromises);

        // Simpan dokter berdasarkan ID-nya
        const doctorMap = {};
        doctors.forEach((doctor) => {
          doctorMap[doctor.data.id] = doctor.data;
        });

        setDoctorData("dokter data", doctorMap);
      } catch (error) {
        console.error("Gagal fetch doctor data:", error);
      }
    };

    if (doctorIds.length > 0) {
      fetchDoctors();
    }
  }, [doctorIds]);
  console.log(doctorData);

  const filteredData =
    submissions?.filter((item) =>
      item.keluhan?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalData = filteredData.length;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const handleDelete = () => setShowDelete(true);
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      {showDelete && <Delete onClose={() => setShowDelete(false)} />}
      <div className="pt-32 w-full px-6 lg:px-3">
        <h1 className="text-3xl font-bold text-black">Riwayat Pengajuan</h1>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row md:justify-between gap-3 mt-6 mb-4">
          <div>
            <label className="mr-2 font-medium">Tampilkan:</label>
            <select
              className="border rounded px-3 py-1"
              value={dataPerPage}
              onChange={(e) => {
                setDataPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5 data</option>
              <option value={10}>10 data</option>
              <option value={20}>20 data</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Cari keluhan..."
              className="border rounded px-3 py-1 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <button
          className="px-4 py-2 mb-4 bg-sky-700 hover:bg-sky-600 font-semibold text-white rounded"
          onClick={async () => {
            refetch();
            console.log("data di refresh");
          }}
        >
          Refresh Data 🔄
        </button>

        {/* Table View */}
        <div className="w-full overflow-x-auto hidden lg:block">
          <table className="w-full mt-8 mb-5 rounded-xl shadow-lg bg-white/60 backdrop-blur-md">
            <thead className="border-b border-gray-200 text-left">
              <tr className="text-black font-semibold">
                <th className="py-4 px-6">Tanggal</th>
                <th className="py-4 px-6">Diagnosis AI</th>
                <th className="py-4 px-6">Gambar</th>
                <th className="py-4 px-6">Keluhan</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Tgl Verifikasi</th>
                <th className="py-4 px-6">Verified By</th>
                <th className="py-4 px-6">Melanoma</th>
                <th className="py-4 px-6">Catatan Dokter</th>
                <th className="py-4 px-6">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-left text-gray-800">
              {isLoadingSubmissions ? (
                <tr>
                  <td colSpan={10} className="text-center py-6">
                    Memuat data...
                  </td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center font-bold py-6">
                    Anda belum memiliki riwayat pengajuan
                  </td>
                </tr>
              ) : (
                currentData.map((item, index) => {
                  const doctor = doctorData[item.doctorId];

                  const percentValue = parseFloat(item.persentase);
                  const textColor =
                    percentValue >= 50 ? "text-red-600" : "text-green-600";

                  const statusColor =
                    item.status === "rejected"
                      ? "text-red-600"
                      : item.status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600";

                  const diagnosisText =
                    item.diagnosis === null
                      ? "Menunggu"
                      : item.diagnosis !== "Melanoma"
                      ? "Bukan Melanoma"
                      : "Melanoma";

                  return (
                    <tr key={index} className="*:align-top">
                      <td className="py-6 px-6">{item.submittedAt}</td>
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
                      <td className="py-6 px-6">
                        <p className="w-40 h-32 overflow-hidden text-ellipsis">
                          {item.complaint}
                        </p>
                      </td>
                      <td className={`py-6 px-6 font-semibold ${statusColor}`}>
                        {item.status}
                      </td>
                      <td className="py-6 px-6">{item.verifiedAt}</td>
                      <td className="py-6 px-6">
                        {doctor ? doctor.name : "Doctor data not available"}
                      </td>
                      <td className="py-6 px-6">{diagnosisText}</td>
                      <td className="py-6 px-6">{item.doctorNote}</td>
                      <td className="py-6 px-6 flex justify-start gap-x-3">
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View Only */}
        <div className="lg:hidden mt-4 space-y-4">
          {currentData.map((item, index) => {
            const doctor = doctorData[item.doctorId];

            const mappedItem = {
              date: item.submittedAt,
              persentase: item.persentase,
              keluhan: item.complaint,
              status: item.status,
              tglVerif: item.verifiedAt,
              verifiedBy: doctor ? doctor.name : "Doctor data not available",
              diagnosis: item.diagnosis,
              doctorNote: item.doctorNote,
            };

            return (
              <MTablePengajuan
                key={index}
                item={mappedItem}
                handleDelete={handleDelete}
              />
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 mb-10 px-4 text-sm text-gray-600">
          <span>
            Halaman {currentPage} dari {totalPages} &nbsp;|&nbsp; Total{" "}
            {totalData} data
          </span>
          <div className="mt-2 lg:mt-0 flex gap-3">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PengajuanPasien;
