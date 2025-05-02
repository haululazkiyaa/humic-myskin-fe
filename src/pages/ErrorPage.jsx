import { useRouteError, useNavigate } from "react-router-dom";
import errorPage from "../assets/img/errorPage.jpeg";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(error);

  const handleBackToLogin = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4">
      <img src={errorPage} alt="error" className="w-[30rem] mb-2" />
      <p className="text-lg font-bold">Something went wrong.</p>
      <pre className="bg-gray-100 p-4 mt-4 rounded text-sm text-red-700 max-w-md overflow-x-auto">
        {error?.statusText || error?.message || "Unexpected error"}
      </pre>

      <button
        onClick={handleBackToLogin}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Kembali ke halaman utama
      </button>
    </div>
  );
};

export default ErrorPage;
