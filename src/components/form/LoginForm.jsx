import { AuthService } from "../../services/auth/auth.service"; // Updated import
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { loginUser } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
=======
import { useState } from "react";
>>>>>>> a9466e8db67406c4b5a64c038a0f4d3db719e8a9

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
<<<<<<< HEAD
      const result = await loginUser(email, password);
      console.log(result);
      alert("Login berhasil!");

      // Simpan user ke context
      login({ ...result.data, token: result.token });

      // Redirect sesuai role
      if (result.data.role === "doctor") {
        navigate("/dokter");
      } else if (result.data.role === "patient") {
=======
      const result = await AuthService.login({ email, password });
      const { token, data: user } = result.data;

      // Save token and user profile to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login berhasil!");

      // Redirect based on role
      if (user.role === "doctor") {
        navigate("/dokter");
      } else if (user.role === "patient") {
        navigate("/deteksi");
      } else {
>>>>>>> a9466e8db67406c4b5a64c038a0f4d3db719e8a9
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

export default LoginForm;
