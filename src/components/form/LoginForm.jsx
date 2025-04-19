import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      alert("Login berhasil!");

      // Redirect sesuai role
      if (result.role === "dokter") {
        navigate("/dokter");
      } else {
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
