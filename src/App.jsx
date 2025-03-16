import "./App.css";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Outlet />
    </div>
  );
}

export default App;
