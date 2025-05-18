import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Delete from "../components/pop-up/Delete";
// import data from "../json/dataAjuan.json";

import deleteBtn from "../assets/icon/delete-button.png";
import infoBtn from "../assets/icon/info-btn.png";
import MTablePengajuan from "../components/table/MTablePengajuan";
import LoadingDot from "../components/loader/LoadingDot";
import { SubmissionsPatientService } from "../services/submissions/submissionsPatient.services";
import { useAuth } from "../context/AuthContext";

const PengajuanPasien = () => {
  const { user } = useAuth();
  const token = user?.token;
  const userId = user?.data?.id;

  const [showDelete, setShowDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataPerPage, setDataPerPage] = useState(5);
  const [deleteId, setDeleteId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const {
    data: submissionsData,
    isLoading: isLoadingSubmissions,
    // isError,
    refetch,
  } = useQuery({
    queryKey: ["submissions", userId],
    queryFn: () => SubmissionsPatientService.getSubmissions({ userId }),
    enabled: !!userId,
  });

  const submissions = useMemo(() => {
    return submissionsData?.data?.data || [];
  }, [submissionsData]);

  const filteredData =
    submissions?.filter((item) =>
      item.verifiedBy?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalData = filteredData.length;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => SubmissionsPatientService.deleteSubmission(id, token),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      refetch();
      setShowDelete(false);
      setDeleteId(null);
    },
    onError: () => {
      toast.error("Gagal menghapus data");
    },
  });
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      {showDelete && (
        <Delete
          onClose={() => setShowDelete(false)}
          onDelete={() => deleteMutation.mutate(deleteId)}
        />
      )}
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
              placeholder="Cari dokter..."
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
          className="px-4 py-2 mb-4 bg-sky-700 hover:bg-sky-600 font-semibold text-white rounded cursor-pointer"
          onClick={async () => {
            try {
              setIsRefreshing(true);
              await refetch();
            } finally {
              setIsRefreshing(false);
            }
          }}
        >
          {isRefreshing ? "Sedang memuat..." : "Refresh Data 🔄"}
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
                  <td colSpan={10} className="py-6">
                    <LoadingDot />
                  </td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center font-bold py-6">
                    Anda belum memiliki riwayat pengajuan
                  </td>
                </tr>
              ): filteredData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center font-bold py-6">
                    Data tidak ditemukan untuk pencarian: <i>{searchTerm}</i>
                  </td>
                </tr>
              ) : (
                currentData.map((item, index) => {
                  const percentValue = parseFloat(item.diagnosisAi);
                  const textColor =
                    percentValue >= 50 ? "text-red-600" : "text-green-600";

                  const statusColor =
                    item.status === "rejected"
                      ? "text-red-600"
                      : item.status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600";

                  return (
                    <tr key={index} className="*:align-middle *:py-3 *:px-6">
                      <td>{item.submittedAt}</td>
                      <td className={`font-semibold ${textColor}`}>
                        {item.diagnosisAi}
                      </td>
                      <td>
                        <div className="w-20 h-16 rounded-lg flex items-center justify-start overflow-hidden p-2">
                          <img
                            className="max-w-full max-h-full object-cover"
                            src={item.imageUrl}
                            alt="Deteksi"
                          />
                        </div>
                      </td>
                      <td className="px-6 text-ellipsis">{item.complaint}</td>
                      <td
                        className={`px-6 font-semibold capitalize ${statusColor}`}
                      >
                        {item.status}
                      </td>
                      <td>{item.verifiedAt}</td>
                      <td>{item.verifiedBy}</td>
                      <td>{item.diagnosis}</td>
                      <td>{item.doctorNote}</td>
                      <td>
                        <div className="flex gap-x-3">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/pengajuan/info/${item.id}`)
                            }
                            className="w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer"
                          >
                            <img src={infoBtn} alt="Info" />
                          </button>
                          <button className="w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                            <img
                              src={deleteBtn}
                              alt="Hapus"
                              onClick={() => handleDelete(item.id)}
                            />
                          </button>
                        </div>
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
            const mappedItem = {
              date: item.submittedAt,
              persentase: item.diagnosisAi,
              keluhan: item.complaint,
              status: item.status,
              tglVerif: item.verifiedAt,
              verifiedBy: item.verifiedBy,
              diagnosis: item.diagnosis,
              doctorNote: item.doctorNote,
            };

            return (
              <MTablePengajuan
                key={index}
                item={mappedItem}
                handleDelete={() => handleDelete(item.id)}
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
