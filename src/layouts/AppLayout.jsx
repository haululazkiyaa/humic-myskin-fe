import Footer from "./PasienLayouts/Footer";
import Navbar from "./PasienLayouts/Navbar";
import NavbarDoctor from "./DoctorLayouts/NavbarDoctor";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const AppLayout = ({ type }) => {
  return (
    <>
      {type === "default" && <Navbar />}
      {type === "doctor" && <NavbarDoctor />}
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
AppLayout.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AppLayout;
