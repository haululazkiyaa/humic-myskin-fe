import { FaPenToSquare } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useState } from "react";
import { SubmissionsPatientService } from "../../services/submissions/submissionsPatient.services";

const EditBox = ({ data, onClose, onUpdated }) => {
  const [editedKeluhan, setEditedKeluhan] = useState(data.complaint || "");
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleEdit = async () => {
    if (!editable) {
      setEditable(true);
      return;
    }

    try {
      setLoading(true);
      await SubmissionsPatientService.updateDetection(
        data.id, 
        { complaint: editedKeluhan },
        token
      );


      if (onUpdated) onUpdated({ complaint: editedKeluhan });
      onClose(); 
    } catch (error) {
      console.error("Gagal memperbarui keluhan:", error);
      alert("Terjadi kesalahan saat memperbarui data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center gap-2 border-b border-gray-200 pb-4">
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
            className="text-gray-600 hover:text-red-500 cursor-pointer"
          >
            ✖
          </button>
        </div>

        {/* Textarea */}
        <textarea
          onChange={(e) => setEditedKeluhan(e.target.value)}
          value={editedKeluhan}
          disabled={!editable}
          className="w-full mt-3 p-3 border rounded-lg text-gray-700 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Buttons */}
        <div className="w-full flex gap-x-1 mt-4">
          <button
            onClick={onClose}
            className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Kembali
          </button>
          <button
            onClick={handleEdit}
            disabled={loading}
            className="w-1/2 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-600 cursor-pointer"
          >
            <span className="flex justify-center items-center gap-2">
              <FaPenToSquare className="text-white text-lg" />
              {editable ? (loading ? "Menyimpan..." : "Simpan") : "Perbarui"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

EditBox.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdated: PropTypes.func,
};

export default EditBox;
