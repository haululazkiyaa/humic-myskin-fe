import App from "../App";
import AppLayout from "../layouts/AppLayout";
import DashboardDokter from "../pages/dokter/DashboardDokter";
import DeteksiPasien from "../pages/DeteksiPasien";
import FAQ from "../pages/FAQ";
import Homepage from "../pages/Homepage";
import InfoDetect from "../layouts/PasienLayouts/Detail-Info/InfoDetect";
import InfoPengajuan from "../layouts/PasienLayouts/Detail-Info/infoPengajuan";
import PengajuanPasien from "../pages/PengajuanPasien";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <App />, // Layout utama untuk user & pasien
    children: [
      {
        element: <AppLayout type="default" />, // Layout utama untuk user & pasien
        children: [
          {
            path: "/",
            element: <Homepage />,
          },
          {
            path: "faq",
            element: <FAQ />,
          },
          {
            path: "info-detect",
            element: <InfoDetect />,
          },
          {
            path: "/info-pengajuan",
            element: <InfoPengajuan />,
          },
        ],
      },
      {
        element: <AppLayout type="default" />, // Pasien tetap pakai layout utama dengan tambahan rute
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
        path: "dokter",
        element: <AppLayout type="doctor" />, // Dokter punya layout sendiri
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
