import "./App.css";

import Footer from "./layouts/AppLayouts/Footer";
import Navbar from "./layouts/AppLayouts/Navbar";
// import NavbarDoctor from "./layouts/NavbarDoctor";
import { Outlet } from "react-router-dom";

function App(isDoctor) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* {isDoctor ? <NavbarDoctor /> : <Navbar />} */}
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
