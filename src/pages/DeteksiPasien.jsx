import { useState } from "react";

import Delete from "../components/pop-up/Delete";
import MTableDeteksi from "../components/table/MTableDeteksi";
// import data from "../json/dataDeteksi";

import deleteBtn from "../assets/icon/delete-button.png";
import infoBtn from "../assets/icon/info-btn.png";
import LoadingDot from "../components/loader/LoadingDot";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SubmissionsPatientService } from "../services/submissions/submissionsPatient.services";

const DeteksiPasien = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = user?.data?.id;
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(5);
  const [deleteId, setDeleteId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: submissionsData,
    isLoading,
    // isError,
    refetch,
  } = useQuery({
    queryKey: ["submissions", userId],
    queryFn: () => SubmissionsPatientService.getDetections({ userId }),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const data = submissionsData?.data?.data || [];

  const filteredData =
    data?.filter((item) =>
      item.complaint?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalData = filteredData.length;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const handleInfo = (id) => {
    navigate(`/deteksi/${id}`);
  };

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
        <h1 className="text-3xl font-bold text-black">Riwayat Deteksi</h1>

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
          className="px-4 py-2 mb-4 bg-sky-700 hover:bg-sky-600 font-semibold text-white rounded cursor-pointer"
          onClick={async () => {
            try {
              setIsRefreshing(true);
              await refetch();
              console.log("data deteksi di refresh");
            } finally {
              setIsRefreshing(false);
            }
          }}
        >
          {isRefreshing ? "Memperbarui..." : "Refresh Data 🔄"}
        </button>

        {/* Desktop Table */}
        <div className="w-full lg:px-0 px-4 overflow-x-auto">
          <table className="hidden lg:table w-full mt-6 mb-5 rounded-xl shadow-lg bg-white/60 backdrop-blur-md">
            <thead className="border-b border-gray-200 text-left">
              <tr className="text-black font-semibold">
                <th className="py-4 px-6">Tanggal Pengajuan</th>
                <th className="py-4 px-6">Diagnosis AI</th>
                <th className="py-4 px-6">Gambar</th>
                <th className="py-4 px-6">Keluhan</th>
                <th className="py-4 px-6">Pengajuan</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-left text-gray-800">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-6">
                    <LoadingDot />
                  </td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center font-bold py-6">
                    Anda belom memiliki riwayat deteksi
                  </td>
                </tr>
              ) : (
                currentData.map((item) => {
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
                    <tr
                      key={item.id}
                      className="*:align-middle *:text-start *:px-6"
                    >
                      <td>{item.submittedAt}</td>
                      <td className={`font-semibold ${textColor}`}>
                        {item.diagnosisAi}
                      </td>
                      <td>
                        <div className="w-40 h-32 rounded-lg flex items-center justify-start overflow-hidden py-2">
                          <img
                            className="max-w-full max-h-full object-contain"
                            src={item.imageUrl}
                            alt="Deteksi"
                          />
                        </div>
                      </td>
                      <td className="text-ellipsis">{item?.complaint}</td>
                      <td
                        className={`font-semibold ${
                          item?.isSubmitted === "Sudah"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item?.isSubmitted}
                      </td>
                      <td className={`font-semibold capitalize ${statusColor}`}>
                        {item.status}
                      </td>
                      <td>
                        <div className="flex gap-x-3">
                          <button
                            type="button"
                            onClick={() => handleInfo(item.id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer"
                          >
                            <img src={infoBtn} alt="Info" />
                          </button>
                          <button
                            type="button"
                            className="w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer"
                          >
                            <img
                              src={deleteBtn}
                              alt="Hapus"
                              onClick={() => handleDelete(item.id)}
                            />
                          </button>
                        </div>
                        {item.isSubmitted === "Tidak" && (
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/pengajuan/ulang/${item.id}`)
                            }
                            className="w-3/4 text-sm font-semibold border border-black py-2 mt-2 rounded-lg cursor-pointer"
                          >
                            Ajukan Verifikasi
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden mt-4 space-y-4">
          {currentData.map((item) => {
            const mappedItem = {
              date: item.submittedAt,
              persentase: item.diagnosisAi,
              imageUrl: item.imageUrl,
              keluhan: item.complaint,
              pengajuan: item.isSubmitted,
              status: item.status,
            };

            return (
              <MTableDeteksi
                key={item.id}
                item={mappedItem}
                handleInfo={() => handleInfo(item.id)}
                handleDelete={() => handleDelete(item.id)}
                handleSubmission={() => navigate(`/pengajuan/ulang/${item.id}`)}
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
              className="px-4 py-2 rounded-md border disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border disabled:cursor-not-allowed disabled:opacity-50"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeteksiPasien;
