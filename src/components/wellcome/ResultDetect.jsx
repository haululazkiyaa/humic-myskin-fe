import PropTypes from "prop-types";
import document from "../../assets/icon/Ellipse 5.png";
import keakuratan from "../../assets/icon/Ellipse 1.png";
import melanoma from "../../assets/icon/Ellipse 3.png";

const ResultDetect = (props) => {
  const { diagnosis, percentage, status } = props;
  return (
    <div className="w-full flex flex-wrap md:flex-nowrap justify-center gap-5 py-6">
      <div className="w-full h-48 shadow-md rounded-lg bg-white flex flex-col justify-center items-center gap-y-2 px-4 py-4 border border-gray-100">
        <img src={melanoma} alt="Melanoma" className="w-16 h-16" />
        <h4 className="text-black font-semibold">Melanoma</h4>
        <p>{percentage > 49 ? "Iya" : "Tidak"}</p>
      </div>
      <div className="w-full h-48 shadow-md rounded-lg bg-white flex flex-col justify-center items-center gap-y-2 px-4 py-4 border border-gray-100">
        <img src={keakuratan} alt="Keakuratan" className="w-16 h-16" />
        <h4 className="text-black font-semibold">Keakuratan</h4>
        <p className={percentage > 49 ? "text-red-500" : "text-green-500"}>
          {diagnosis}
        </p>
      </div>
      <div className="w-full h-48 shadow-md rounded-lg bg-white flex flex-col justify-center items-center gap-y-2 px-4 py-4 border border-gray-100">
        <img src={document} alt="Status" className="w-16 h-16" />
        <h4 className="text-black font-semibold">Status</h4>
        <p className={status == "verified" ? "text-green-500" : "text-red-500"}>
          {status === "verified" ? "Sudah diverifikasi" : "Belum diverifikasi"}
        </p>
      </div>
    </div>
  );
};
ResultDetect.propTypes = {
  diagnosis: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default ResultDetect;
