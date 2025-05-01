import PropTypes from "prop-types";

const PageForm2 = ({onSubmit, onDotClick}) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      if (form.checkValidity()) {
        onSubmit(); 
      } else {
        form.reportValidity(); 
      }
    };
  return (
    <div className="max-w-md mx-auto px-2 py-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Spesialisasi</label>
            <select className="w-full rounded-full border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Pilih spesialisasi kamu</option>
              <option value="kulit">Dokter Spesialis Kulit</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Nomor Registrasi Dokter
            </label>
            <input
              type="text"
              placeholder="Masukkan nomor registrasi dokter"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Surat Tanda Registrasi
          </label>
          <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
            <input type="file" className="flex-1 px-4 py-2 text-sm" />
            <button
              type="button"
              className="bg-[#1E3A5F] text-white px-4 py-2 text-sm font-semibold"
            >
              Upload
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">
              Ijazah Kedokteran
            </label>
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
              <input type="file" className="flex-1 px-4 py-2 text-sm" />
              <button
                type="button"
                className="bg-[#1E3A5F] text-white px-4 py-2 text-sm font-semibold"
              >
                Upload
              </button>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Sertifikat Keahlian (opsional)
            </label>
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
              <input type="file" className="flex-1 px-4 py-2 text-sm" />
              <button
                type="button"
                className="bg-[#1E3A5F] text-white px-4 py-2 text-sm font-semibold"
              >
                Upload
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Institusi Kerja</label>
            <input
              type="text"
              placeholder="Masukkan institusi"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Pengalaman Kerja</label>
            <input
              type="text"
              placeholder="Masukkan pengalaman kerja"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Publikasi Ilmiah (opsional)
          </label>
          <input
            type="text"
            placeholder="Masukkan publikasi ilmiah"
            className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="terms" className="accent-[#1E3A5F]" />
          <label htmlFor="terms" className="text-sm">
            Saya setuju dengan persyaratan penggunaan
          </label>
        </div>

        {/* Tombol Daftar */}
        <button
          type="submit"
          className="w-full bg-[#1E3A5F] text-white font-semibold py-2 rounded-full hover:bg-[#1A2F4A] transition"
        >
          Daftar
        </button>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          <span
            className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"
            onClick={onDotClick}
          ></span>
          <span className="w-3 h-3 rounded-full bg-[#1E3A5F]"></span>
        </div>
      </form>
    </div>
  );
};

PageForm2.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onDotClick: PropTypes.func.isRequired,
};

export default PageForm2;
