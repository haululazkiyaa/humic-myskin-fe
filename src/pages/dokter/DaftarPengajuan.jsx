import data from "../../json/dataDaftarPengajuan.json";
import { useState } from "react";

const DaftarPengajuan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.dataDaftarPengajuan
    ? data.dataDaftarPengajuan.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = data.dataDaftarPengajuan
    ? Math.ceil(data.dataDaftarPengajuan.length / itemsPerPage)
    : 0;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-black text-center">
        Daftar Pengajuan Umum
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {currentItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={item.gambar}
              alt="Melanoma"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="font-semibold mt-3">{item.nama}</h2>
            <p className="text-sm text-gray-600">{item.tanggal}</p>
            <p className="text-sm font-semibold text-red-600 mt-2">
              {item.diagnosis}: {item.probabilitas}
            </p>
            <button className="w-full bg-[#12476B] text-white py-2 mt-3 rounded-full cursor-pointer">
              Detail Pengajuan
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === index + 1
                ? "bg-[#12476B] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaftarPengajuan;
