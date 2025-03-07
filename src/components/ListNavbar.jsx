import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ListNavbar = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="font-normal text-md text-black hover:text-gray-700 focus:font-bold cursor-pointer"
    >
      {children}
    </Link>
  );
};

ListNavbar.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};

export default ListNavbar;
