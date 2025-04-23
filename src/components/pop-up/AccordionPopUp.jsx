import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

const AccordionPopUp = ({ title, description, onClose }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative">
      {/* Tombol close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        <FaTimes size={16} />
      </button>

      {/* Konten modal */}
      <h2 className="text-lg font-semibold text-sky-700 mb-2">{title}</h2>
      <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

AccordionPopUp.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AccordionPopUp;
