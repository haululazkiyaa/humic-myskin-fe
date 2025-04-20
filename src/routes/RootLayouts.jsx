import App from "../App";
import AppLayout from "../layouts/AppLayout";
import DaftarPasien from "../pages/dokter/DaftarPasien";
import DaftarPengajuan from "../pages/dokter/DaftarPengajuan";
import DashboardDokter from "../pages/dokter/DashboardDokter";
import DeteksiPasien from "../pages/DeteksiPasien";
import FAQ from "../pages/FAQ";
import Homepage from "../pages/Homepage";
import InfoDetect from "../layouts/PasienLayouts/Detail-Info/InfoDetect";
import InfoPengajuan from "../layouts/PasienLayouts/Detail-Info/infoPengajuan";
import InformasiPenyakit from "../pages/dokter/InformasiPenyakit";
import PengajuanPasien from "../pages/PengajuanPasien";
import RequireAuth from "../middleware/RequireAuth";
import RiwayatVerifikasi from "../pages/dokter/RiwayatVerifikasi";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <AppLayout type="default" />,
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
        element: (
          <RequireAuth>
            <AppLayout type="default" />
          </RequireAuth>
        ),
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
        element: (
          <RequireAuth>
            <AppLayout type="doctor" />
          </RequireAuth>
        ),
        children: [
          {
            path: "",
            element: <DashboardDokter />,
          },
          {
            path: "daftar-pasien",
            element: <DaftarPasien />,
          },
          {
            path: "daftar-pengajuan",
            element: <DaftarPengajuan />,
          },
          {
            path: "riwayat-verifikasi",
            element: <RiwayatVerifikasi />,
          },
          {
            path: "riwayat-verifikasi/informasi-penyakit/:id",
            element: <InformasiPenyakit />,
          },
        ],
      },
    ],
  },
]);
