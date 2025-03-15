import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardDokter from "../pages/dokter/DashboardDokter";
import DeteksiPasien from "../pages/DeteksiPasien";
import FAQ from "../pages/FAQ";
import Homepage from "../pages/Homepage";
import InfoDetect from "../layouts/AppLayouts/InfoDetect";
import PengajuanPasien from "../pages/PengajuanPasien";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout utama untuk user & pasien
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
        path: "/info-detect",
        element: <InfoDetect />,
      },
    ],
  },
  {
    path: "/",
    element: <App />, // Pasien tetap pakai layout utama dengan tambahan rute
    children: [
      {
        path: "deteksi",
        element: <DeteksiPasien />,
      },
      {
        path: "pengajuan",
        element: <PengajuanPasien />,
      },
    ],
  },
  {
    path: "/dokter",
    element: <App />, // Dokter punya layout sendiri
    children: [
      {
        path: "/dokter",
        element: <DashboardDokter />,
      },
    ],
  },
]);
