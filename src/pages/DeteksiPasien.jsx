import { useState } from "react";

import Delete from "../components/pop-up/Delete";
import Edit from "../components/pop-up/EditBox";
import MTableDeteksi from "../components/table/MTableDeteksi";
import data from "../json/dataDeteksi";

import deleteBtn from "../assets/icon/delete-button.png";
import editBtn from "../assets/icon/edit-button.png";
import infoBtn from "../assets/icon/info-btn.png";
import testImage from "../assets/img/test-myskin.jpg";

const DeteksiPasien = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataPerPage, setDataPerPage] = useState(5);

  const filteredData = data.dataDetect.filter((item) =>
    item.keluhan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalData = filteredData.length;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const handleEdit = () => setShowEdit(true);
  const handleDelete = () => setShowDelete(true);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      {showEdit && <Edit onClose={() => setShowEdit(false)} />}
      {showDelete && <Delete onClose={() => setShowDelete(false)} />}

      <div className="pt-32 w-full px-6 lg:px-10">
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

        {/* Desktop Table */}
        <div className="w-full lg:px-0 px-4 overflow-x-auto">
          <table className="hidden lg:table w-full mt-8 mb-5 rounded-xl shadow-lg bg-white/60 backdrop-blur-md">
            <thead className="border-b border-gray-200 text-left">
              <tr className="text-black font-semibold">
                <th className="py-4 px-6">Tanggal Pengajuan</th>
                <th className="py-4 px-6">Diagnosis AI</th>
                <th className="py-4 px-6">Gambar</th>
                <th className="py-4 px-6">Keluhan</th>
                <th className="py-4 px-6">Pengajuan</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-left text-gray-800">
              {currentData.map((item, index) => {
                const percentValue = parseFloat(item.persentase);
                const textColor =
                  percentValue >= 50 ? "text-red-600" : "text-green-600";

                return (
                  <tr key={index} className="*:align-top">
                    <td className="py-6 px-6">{item.date}</td>
                    <td className={`py-6 px-6 font-semibold ${textColor}`}>
                      {item.persentase}
                    </td>
                    <td className="py-6 px-6">
                      <div className="w-40 h-32 rounded-lg overflow-hidden mx-auto">
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
                        item.pengajuan === "Sudah"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.pengajuan}
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
                    <td className="py-6 px-6 flex justify-start gap-x-3">
                      <button
                        onClick={() => (window.location.href = "/info-detect")}
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
                      <button className="w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                        <img src={editBtn} alt="Edit" onClick={handleEdit} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        {currentData.map((item, index) => (
          <MTableDeteksi
            key={index}
            item={item}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}

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
              className="px-4 py-2 rounded-md border disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border disabled:opacity-50"
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