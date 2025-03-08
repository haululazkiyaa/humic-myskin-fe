import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Homepage";
import FAQ from "../pages/FAQ";
import DeteksiPasien from "../pages/DeteksiPasien";
import PengajuanPasien from "../pages/PengajuanPasien";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/deteksi-pasien",
        element: <DeteksiPasien />,
      },
      {
        path: "/pengajuan-pasien",
        element: <PengajuanPasien />,
      },
    ],
  },
]);
