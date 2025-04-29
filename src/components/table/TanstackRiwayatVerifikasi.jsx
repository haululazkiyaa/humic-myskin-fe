import {
  FaArrowDownAZ,
  FaArrowUpAZ,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { FaEye, FaSearch } from "react-icons/fa";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const TanstackRiwayatVerifikasi = ({ data }) => {
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const columns = useMemo(
    () => [
      {
        header: "Tanggal Pengajuan",
        accessorKey: "submittedAt",
      },
      {
        header: "Pasien",
        accessorKey: "patientName",
      },
      {
        header: "Diagnosis AI",
        accessorKey: "diagnosis",
        cell: ({ getValue }) => (
          <span className="text-green-600 font-semibold block">
            {getValue()}
          </span>
        ),
      },
      {
        header: "Verifikasi Dokter",
        accessorKey: "doctorNote",
      },
      {
        header: "Catatan",
        accessorKey: "doctorNote",
        cell: ({ getValue }) => (
          <p className="truncate max-w-[250px]">{getValue()}</p>
        ),
      },
      {
        header: "Detail",
        cell: ({ row }) => (
          <button
            onClick={() =>
              navigate(
                `/dokter/riwayat-verifikasi/informasi-penyakit/${row.original.id}`
              )
            } // <-- corrected path
            className="w-full bg-[#12476B] text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2"
          >
            <FaEye size={18} />
            Detail
          </button>
        ),
      },
    ],
    [navigate]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  // Update page size if dropdown changes
  const handlePageSizeChange = (e) => {
    const size = Number(e.target.value);
    setPageSize(size);
    table.setPageSize(size);
  };

  return (
    <div className="w-full mt-8 mb-5 rounded-xl shadow-lg bg-white p-6 overflow-auto border border-gray-100">
      {/* 🔍 Search & Dropdown */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <label
            htmlFor="pageSize"
            className="text-sm text-gray-700 whitespace-nowrap"
          >
            Tampilkan
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-3 py-2 border border-gray-200 rounded-lg shadow-sm text-sm"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} data
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Cari data..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full shadow-sm"
          />
        </div>
      </div>

      {/* 🧾 Table */}
      <table className="w-full text-left">
        <thead className="border-b border-gray-200 text-black font-semibold">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-4 px-6 text-center cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center justify-center gap-1">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <FaArrowUpAZ size={14} />,
                      desc: <FaArrowDownAZ size={14} />,
                    }[header.column.getIsSorted()] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="text-gray-800">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-4 px-6 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📄 Pagination */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
          {table.getPageCount()} &nbsp; | &nbsp; Total:{" "}
          {table.getFilteredRowModel().rows.length} data
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 flex items-center gap-1"
          >
            <FaChevronLeft />
            Sebelumnya
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 flex items-center gap-1"
          >
            Selanjutnya
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

TanstackRiwayatVerifikasi.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TanstackRiwayatVerifikasi;
