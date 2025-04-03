import { useState } from "react";

const DaftarPengajuan = () => {
  const daftarPengajuan = Array(16).fill({
    nama: "Muhammad Nur Shodiq",
    tanggal: "7 Oktober 2024",
    diagnosis: "Melanoma",
    probabilitas: "93.00%",
    gambar:
      "https://s3-alpha-sig.figma.com/img/3839/e37d/5c691e10c1cd84120239f3d55f829794?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KxKDI3~mMBgaCGszeDXSwnM-EQfZU7thhS09WfbahihKgCwxh50duR8jwfkHIxJWAGHv0caWd1ANieTLBktEfFykslF~kBJnKjWVODGdYeJ4FYOiabCIwfSSgrAp85M7QHyfj2yjWILWs5Tf90IrOEJHCrtQJe~qYa0lqFLyGq817hvh-my5t2JNozRsr21oEGeBz0dO6PzWwy4l6r1TdKaVtxa-STUkPkfo8q1Jgb9MdIhf4QLth130HSuSBZ7YlVI5lLsxX6M2TJM44p~x2hHLpmundhq4Xtw3sQ~P40H2SDLMZMeGusfZuvoXAznxpogLQmdmAxNz9v2BQ9PQ6g__", // Gantilah dengan URL gambar yang sesuai
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = daftarPengajuan.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(daftarPengajuan.length / itemsPerPage);

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
