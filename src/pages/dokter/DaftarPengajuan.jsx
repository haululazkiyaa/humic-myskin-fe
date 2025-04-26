import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

import { SubmissionsService } from "../../services/submissions/submissions.service";
import { useNavigate } from "react-router-dom";

const DaftarPengajuan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await SubmissionsService.getSubmissions({
          page: currentPage,
          limit: itemsPerPage,
        });
        setSubmissions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setError("Failed to fetch submissions");
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [currentPage]);

  // Check if API returns paginated data or we need to paginate manually
  const currentItems = submissions.data || [];

  // If API returns total pages use that, otherwise calculate
  const totalPages =
    submissions.totalPages ||
    (submissions.data ? Math.ceil(submissions.data.length / itemsPerPage) : 0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const paginationButtons = [];
    const maxButtonsToShow = 5;

    if (totalPages <= maxButtonsToShow) {
      // Show all buttons if total pages are less than or equal to maxButtonsToShow
      for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === i
                ? "bg-[#12476B] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show limited buttons with ellipses
      paginationButtons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === 1
              ? "bg-[#12476B] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        paginationButtons.push(
          <span key="start-ellipsis" className="px-2">
            ...
          </span>
        );
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        paginationButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === i
                ? "bg-[#12476B] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        paginationButtons.push(
          <span key="end-ellipsis" className="px-2">
            ...
          </span>
        );
      }

      paginationButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            currentPage === totalPages
              ? "bg-[#12476B] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return paginationButtons;
  };

  return (
    <div className="container mx-auto min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-black text-center">
        Daftar Pengajuan Umum
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-4">
                <img
                  src={item.imageUrl}
                  alt="Skin Condition"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h2 className="font-semibold mt-3">{item.patientName}</h2>
                <p className="text-sm text-gray-600">{item.submittedAt}</p>
                <p className="text-sm font-semibold text-red-600 mt-2">
                  {item.diagnosis}: {item.probability}
                </p>
                <button
                  className="w-full bg-[#12476B] text-white py-2 mt-3 rounded-full cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/dokter/riwayat-verifikasi/informasi-penyakit/${item.id}`
                    )
                  }
                >
                  Detail Pengajuan
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-10">
              <p>No submissions found</p>
            </div>
          )}
        </div>
      )}
      {!loading && !error && totalPages > 0 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg cursor-pointer flex items-center ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500"
                : "bg-gray-200 text-black"
            }`}
          >
            <FaChevronLeft className="mr-2" />
            Sebelumnya
          </button>
          {renderPaginationButtons()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg cursor-pointer flex items-center ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500"
                : "bg-gray-200 text-black"
            }`}
          >
            Selanjutnya
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DaftarPengajuan;
