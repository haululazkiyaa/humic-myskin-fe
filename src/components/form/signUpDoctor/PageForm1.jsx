import PropTypes from "prop-types";

const PageForm1 = ({ onNext, onDotClick}) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      if (form.checkValidity()) {
        onNext(); 
      } else {
        form.reportValidity(); 
      }
    };
  return (
    <div className="max-w-md mx-auto px-2 py-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold mb-1">Nama Lengkap</label>
          <input
            type="text"
            placeholder="Nama lengkap kamu"
            required
            className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Masukkan email kamu"
              required
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">No. Telepon</label>
            <input
              type="tel"
              placeholder="Masukkan nomor telepon kamu"
              required
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Kata Sandi</label>
            <input
              type="password"
              placeholder="Masukkan kata sandi"
              required
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              placeholder="Masukkan kembali kata sandi"
              required
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Alamat Praktik</label>
          <input
            type="text"
            placeholder="Masukkan alamat praktik"
            required
            className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tombol Next */}
        <button
          type="button"
          onClick={onNext}
          className="w-full bg-[#1E3A5F] text-white font-semibold py-2 rounded-full hover:bg-[#1A2F4A] transition"
        >
          Next
        </button>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#1E3A5F]"></span>
          <span
            className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"
            onClick={onDotClick}
          ></span>
        </div>
      </form>
    </div>
  );
};

PageForm1.propTypes = {
  onNext: PropTypes.func.isRequired,
  onDotClick: PropTypes.func.isRequired,
};

export default PageForm1;
