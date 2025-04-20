import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Restrict access based on role
  if (
    user.role === "patient" &&
    !location.pathname.startsWith("/deteksi") &&
    !location.pathname.startsWith("/pengajuan")
  ) {
    return <Navigate to="/deteksi" replace />;
  }

  if (user.role === "doctor" && !location.pathname.startsWith("/dokter")) {
    return <Navigate to="/dokter" replace />;
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.node,
};

export default RequireAuth;
