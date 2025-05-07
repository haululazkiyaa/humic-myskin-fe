import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaSearch, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { SubmissionsPatientService } from "../../services/submissions/submissionsPatient.services";
import LoadingCircle from "../loader/LoadingCircle";
import PropTypes from "prop-types";

const DoctorList = ({ handleDoctorSelect }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const doctorsPerPage = 8;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctors", search],
    queryFn: () => SubmissionsPatientService.getListDoctors({ search }),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const doctors = data?.data?.data || [];

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const displayedDoctors = filteredDoctors.slice(
    (page - 1) * doctorsPerPage,
    page * doctorsPerPage
  );

  return (
    <div className="w-full pt-4">
      {/* Search Bar */}
      <div className="w-full flex items-center bg-white shadow-md rounded-lg px-4 py-2 mb-6 mx-auto">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Cari dokter"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex- outline-none bg-transparent text-gray-700"
        />
      </div>

      {/* Loading/Error State */}
      {isLoading ? (
        <LoadingCircle />
      ) : isError ? (
        <p className="text-center text-red-500">Gagal memuat data dokter.</p>
      ) : (
        <>
          {/* Grid of Doctors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {displayedDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex flex-col items-center bg-white rounded-xl shadow-md p-4"
              >
                <img
                  src="https://img.freepik.com/free-photo/young-female-doctor-office_1303-18666.jpg?w=200"
                  alt="dokter"
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <p className="font-semibold text-center">dr. {doctor.name}</p>
                <button
                  onClick={() => handleDoctorSelect?.(doctor)}
                  className="mt-3 bg-sky-900 text-white px-6 py-2 rounded-full cursor-pointer"
                >
                  Pilih Dokter
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-md bg-white border disabled:opacity-50"
              >
                <FaChevronLeft className="m-1" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded-md border ${
                    page === p
                      ? "bg-sky-900 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="px-3 py-1 rounded-md bg-white border disabled:opacity-50"
              >
                <FaChevronRight className="m-1" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

DoctorList.propTypes = {
  handleDoctorSelect: PropTypes.func,
};

export default DoctorList;
