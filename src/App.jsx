import "./App.css";

import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import NavbarDoctor from "./layouts/NavbarDoctor";
import { Outlet } from "react-router-dom";

function App(isDoctor) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {isDoctor ? <NavbarDoctor /> : <Navbar />}
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
