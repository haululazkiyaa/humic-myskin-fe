import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    let redirectPath = "/";

    // Cek format email untuk menentukan role
    if (email.endsWith("@pasien.myskin.ac.id")) {
      localStorage.setItem(
        "user",
        JSON.stringify({ email, role: "pasien", token: "xyz123" })
      );
      alert("Login berhasil sebagai Pasien!");
    } else if (email.endsWith("@dokter.myskin.ac.id")) {
      localStorage.setItem(
        "user",
        JSON.stringify({ email, role: "dokter", token: "abc789" })
      );
      redirectPath = "/dokter";
      alert("Login berhasil sebagai Dokter!");
    } else {
      alert("Email harus menggunakan domain yang valid!");
      return;
    }

    navigate(redirectPath);

    window.location.reload(); // Refresh untuk memperbarui state aplikasi
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div className="space-y-4">
        <label className="size-[14px] font-bold">Email</label>
        <input
          type="email"
          placeholder="Masukkan email kamu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border rounded-[16px] mt-1 border-[#B8B8B8]"
        />
      </div>

      <div className="space-y-4">
        <label className="size-[14px] font-bold">Kata Sandi</label>
        <input
          type="password"
          placeholder="Masukkan kata sandi kamu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border rounded-[16px] mt-1 border-[#B8B8B8]"
        />
      </div>

      <div className="flex items-center justify-between mb-4 text-[#646464]">
        <div>
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember">Remember Me</label>
        </div>
        <a href="#" className="text-[#2699E8]">
          Lupa Kata Sandi?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-[#12476B] text-white py-3 rounded-full cursor-pointer"
      >
        Masuk
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginForm;
