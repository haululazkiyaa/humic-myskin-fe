import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/Navbar";

function App() {
  return (
    <div className="relative w-full h-screen">
      <Navbar/>
      <Outlet/>
    </div>
  );
}

export default App;
