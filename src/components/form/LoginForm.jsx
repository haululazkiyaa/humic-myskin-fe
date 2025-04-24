import { AuthService } from "../../services/auth/auth.service"; // Updated import
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AccountsService } from "../../services/accounts/accounts.services";
import PropTypes from "prop-types";

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await AuthService.login({ email, password });
      const { token, data: user } = result.data;

      // Save token and user profile to localStorage
      localStorage.setItem("token", token);

      // Ambil data akun lengkap berdasarkan ID user
      const accountRes = await AccountsService.getAccountById(user.id);
      const fullAccount = accountRes.data;

      localStorage.setItem("user", JSON.stringify(fullAccount));
      login(fullAccount); 

      alert("Login berhasil!");

      if(onClose) onClose();

      // Redirect based on role
      if (fullAccount.data.role === "doctor") {
        navigate("/dokter");
      } else if (fullAccount.data.role === "patient") {
        navigate("/");
      }

      // Clear form
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Login gagal: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div className="space-y-2">
        <label className="text-[14px] font-bold">Email</label>
        <input
          type="email"
          placeholder="Masukkan email kamu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border rounded-[16px] mt-1 border-[#B8B8B8] text-black"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[14px] font-bold">Kata Sandi</label>
        <input
          type="password"
          placeholder="Masukkan kata sandi kamu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border rounded-[16px] mt-1 border-[#B8B8B8] text-black"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#12476B] text-white font-bold py-3 rounded-full cursor-pointer"
      >
        {loading ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginForm;
