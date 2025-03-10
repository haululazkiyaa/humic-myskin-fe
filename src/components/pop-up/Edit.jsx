import PropTypes from "prop-types";
import { FaPenToSquare } from "react-icons/fa6";
import data from "../../json/dataDeteksi.json";

const Edit = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center gap-2 border-b border-gray-400 pb-4">
          <div className="flex items-center gap-2">
            <span className="bg-orange-400 p-2 rounded-full">
              <FaPenToSquare className="text-white text-lg" />
            </span>
            <h2 className="text-lg font-semibold text-gray-700">
              Perbarui Keluhan
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            ✖
          </button>
        </div>

        {/* Textarea untuk Keluhan */}
        <textarea
          className="w-full mt-3 p-3 border rounded-lg text-gray-700 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {data.dataDetect[0].keluhan}
        </textarea>

        {/* Tombol Aksi */}
        <div className="w-full flex gap-x-1 mt-4">
          <button
            onClick={onClose}
            className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Kembali
          </button>
          <button className="w-1/2 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-600 cursor-pointer">
            <span className="flex justify-center items-center gap-2">
              <FaPenToSquare className="text-white text-lg" />
              Perbarui
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

Edit.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Edit;
