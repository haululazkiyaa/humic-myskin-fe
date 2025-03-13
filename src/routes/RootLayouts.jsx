import App from "../App";
import DashboardDokter from "../pages/dokter/DashboardDokter";
import DeteksiPasien from "../pages/DeteksiPasien";
import FAQ from "../pages/FAQ";
import Homepage from "../pages/Homepage";
import InfoDetect from "../layouts/AppLayouts/InfoDetect";
import PengajuanPasien from "../pages/PengajuanPasien";
import { createBrowserRouter } from "react-router-dom";

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
      // pasien
      {
        path: "/deteksi-pasien",
        element: <DeteksiPasien />,
      },
      {
        path: "/pengajuan-pasien",
        element: <PengajuanPasien />,
      },
      {
        path: "/info-detect",
        element: <InfoDetect />,
      },
      // dokter
      {
        path: "/dokter",
        element: <App isDokter={true} />,
        children: [
          {
            path: "dashboard",
            element: <DashboardDokter />,
          },
        ],
      },
    ],
  },
]);
