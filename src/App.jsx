import "./App.css";
import { Outlet } from "react-router-dom";

import Footer from "./layouts/AppLayouts/Footer";
import Navbar from "./layouts/AppLayouts/Navbar";
import NavbarDoctor from "./layouts/DoctorLayouts/NavbarDoctor";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {user && user.role === "dokter" ? <NavbarDoctor /> : <Navbar />}
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
